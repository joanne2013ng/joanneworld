// Vercel serverless function — proxies Yahoo Finance's public chart API server-side,
// so the browser never has to make a cross-origin request to Yahoo directly (which
// would be blocked by CORS). Returns current price plus a year of daily closes
// (oldest -> newest) per symbol in one call.
module.exports = async (req, res) => {
  const symbolsParam = typeof req.query.symbols === 'string' ? req.query.symbols : '';
  const symbols = symbolsParam
    .split(',')
    .map(function (s) { return s.trim().toUpperCase(); })
    .filter(Boolean);

  if (!symbols.length) {
    res.status(400).json({ error: 'symbols query param required' });
    return;
  }

  const results = {};

  await Promise.all(symbols.map(async function (sym) {
    try {
      const url = 'https://query1.finance.yahoo.com/v8/finance/chart/' +
        encodeURIComponent(sym) + '?range=1y&interval=1d';
      const r = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          'Accept': 'application/json'
        }
      });
      if (!r.ok) return;
      const data = await r.json();
      const result = data && data.chart && data.chart.result && data.chart.result[0];
      if (!result) return;

      const price = result.meta && typeof result.meta.regularMarketPrice === 'number'
        ? result.meta.regularMarketPrice : null;
      const quote = result.indicators && result.indicators.quote && result.indicators.quote[0];
      const closesRaw = quote && Array.isArray(quote.close) ? quote.close : [];
      const closes = closesRaw.filter(function (v) { return typeof v === 'number'; });

      if (price === null && !closes.length) return;
      results[sym] = { price: price, closes: closes };
    } catch (e) {
      // leave symbol out of results on failure — client treats missing symbol as "no data"
    }
  }));

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=180');
  res.status(200).json(results);
};

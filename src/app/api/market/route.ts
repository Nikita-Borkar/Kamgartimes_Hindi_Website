import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface MarketQuote {
  name: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

let cachedQuotes: MarketQuote[] | null = null;
let lastFetchTime = 0;
let cachedTimestamp = 0;
const CACHE_TTL = 45 * 1000; // 45 seconds cache

function formatIndianNumber(num: number, decimals = 2): string {
  if (isNaN(num)) return "0.00";
  return num.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

async function fetchSymbol(symbol: string) {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 30 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta) return null;

    const price = meta.regularMarketPrice ?? 0;
    const prevClose = meta.chartPreviousClose || meta.previousClose || price;
    const diff = price - prevClose;
    const percent =
      meta.regularMarketChangePercent ??
      (prevClose ? (diff / prevClose) * 100 : 0);

    return {
      price,
      prevClose,
      diff,
      percent,
      marketTime:
        typeof meta.regularMarketTime === "number"
          ? meta.regularMarketTime * 1000
          : Date.now(),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const now = Date.now();
  if (cachedQuotes && now - lastFetchTime < CACHE_TTL) {
    return NextResponse.json({
      success: true,
      data: cachedQuotes,
      source: "cache",
      timestamp: cachedTimestamp,
    });
  }

  try {
    const [nifty, sensex, bankNifty, niftyIt, usdinr, goldFuture, silverFuture] =
      await Promise.all([
        fetchSymbol("^NSEI"),
        fetchSymbol("^BSESN"),
        fetchSymbol("^NSEBANK"),
        fetchSymbol("^CNXIT"),
        fetchSymbol("USDINR=X"),
        fetchSymbol("GC=F"),
        fetchSymbol("SI=F"),
      ]);

    const quotes: MarketQuote[] = [];

    // Only publish quotes returned by the provider. Never show fabricated prices.
    if (nifty && nifty.price > 0) {
      const isUp = nifty.percent >= 0;
      quotes.push({
        name: "NIFTY 50",
        value: formatIndianNumber(nifty.price),
        change: `${isUp ? "+" : ""}${nifty.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (sensex && sensex.price > 0) {
      const isUp = sensex.percent >= 0;
      quotes.push({
        name: "SENSEX",
        value: formatIndianNumber(sensex.price),
        change: `${isUp ? "+" : ""}${sensex.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (bankNifty && bankNifty.price > 0) {
      const isUp = bankNifty.percent >= 0;
      quotes.push({
        name: "BANK NIFTY",
        value: formatIndianNumber(bankNifty.price),
        change: `${isUp ? "+" : ""}${bankNifty.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (niftyIt && niftyIt.price > 0) {
      const isUp = niftyIt.percent >= 0;
      quotes.push({
        name: "NIFTY IT",
        value: formatIndianNumber(niftyIt.price),
        change: `${isUp ? "+" : ""}${niftyIt.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (usdinr && usdinr.price > 0) {
      const isUp = usdinr.percent >= 0;
      quotes.push({
        name: "USD/INR",
        value: `₹${usdinr.price.toFixed(2)}`,
        change: `${isUp ? "+" : ""}${usdinr.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    // Approximate INR commodity values from futures and USD/INR quotes.
    if (goldFuture && goldFuture.price > 0 && usdinr && usdinr.price > 0) {
      const gold10g = (goldFuture.price / 31.1035) * 10 * usdinr.price * 1.13;
      const isUp = goldFuture.percent >= 0;
      quotes.push({
        name: "GOLD (10g)",
        value: `₹${Math.round(gold10g).toLocaleString("en-IN")}`,
        change: `${isUp ? "+" : ""}${goldFuture.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (silverFuture && silverFuture.price > 0 && usdinr && usdinr.price > 0) {
      const silver1kg = (silverFuture.price / 31.1035) * 1000 * usdinr.price * 1.13;
      const isUp = silverFuture.percent >= 0;
      quotes.push({
        name: "SILVER (1kg)",
        value: `₹${Math.round(silver1kg).toLocaleString("en-IN")}`,
        change: `${isUp ? "+" : ""}${silverFuture.percent.toFixed(2)}%`,
        trend: isUp ? "up" : "down",
      });
    }

    if (quotes.length === 0) {
      if (cachedQuotes?.length) {
        return NextResponse.json({
          success: true,
          data: cachedQuotes,
          source: "cache-stale",
          timestamp: cachedTimestamp,
        });
      }

      return NextResponse.json(
        { success: false, data: [], message: "Market data is temporarily unavailable." },
        { status: 502 }
      );
    }

    cachedQuotes = quotes;
    lastFetchTime = now;
    cachedTimestamp = Math.max(
      ...[nifty, sensex, bankNifty, niftyIt, usdinr, goldFuture, silverFuture]
        .filter((quote): quote is NonNullable<typeof quote> => quote !== null)
        .map((quote) => quote.marketTime)
    );

    return NextResponse.json({
      success: true,
      data: quotes,
      source: "live",
      timestamp: cachedTimestamp,
    });
  } catch (err: any) {
    if (cachedQuotes) {
      return NextResponse.json({
        success: true,
        data: cachedQuotes,
        source: "cache-stale",
        timestamp: cachedTimestamp,
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: err?.message || "Failed to fetch live market quotes",
      },
      { status: 500 }
    );
  }
}

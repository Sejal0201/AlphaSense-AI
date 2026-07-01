import { SMA, EMA, BollingerBands, RSI, MACD } from "technicalindicators";
export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function calculateSMA(candles: Candle[], period: number) {
  const closes = candles.map((c) => c.close);

  const sma = SMA.calculate({
    period,
    values: closes,
  });

  return candles.slice(period - 1).map((candle, index) => ({
    time: candle.time,
    value: sma[index],
  }));
}

export function calculateEMA(candles: Candle[], period: number) {
  const closes = candles.map((c) => c.close);

  const ema = EMA.calculate({
    values: closes,
    period,
  });

  return candles.slice(period - 1).map((candle, i) => ({
    time: candle.time,
    value: ema[i],
  }));
}

export function calculateBollingerBands(
  candles: Candle[],
  period: number = 20,
  stdDev: number = 2,
) {
  const closes = candles.map((c) => c.close);

  const bands = BollingerBands.calculate({
    period,
    values: closes,
    stdDev,
  });

  return {
    upper: candles.slice(period - 1).map((candle, index) => ({
      time: candle.time,
      value: bands[index].upper,
    })),

    middle: candles.slice(period - 1).map((candle, index) => ({
      time: candle.time,
      value: bands[index].middle,
    })),

    lower: candles.slice(period - 1).map((candle, index) => ({
      time: candle.time,
      value: bands[index].lower,
    })),
  };
}
export function calculateRSI(
  candles: Candle[],
  period = 14
) {
  const closes = candles.map((c) => c.close);

  const rsi = RSI.calculate({
    period,
    values: closes,
  });

  return candles
    .slice(period)
    .map((candle, index) => ({
      time: candle.time,
      value: rsi[index],
    }));
}

export function calculateMACD(
  candles: Candle[]
) {
  const closes = candles.map((c) => c.close);

  const macd = MACD.calculate({
    values: closes,
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
    SimpleMAOscillator: false,
    SimpleMASignal: false,
  });

  return candles
    .slice(33)
    .map((candle, index) => ({
      time: candle.time,
      macd: macd[index].MACD ?? 0,
      signal: macd[index].signal ?? 0,
      histogram: macd[index].histogram ?? 0,
    }));
}
// import { useHistory } from "../../../hooks/useStocks";

// export function useCandlestick(
//   symbol: string,
//   period = "1mo",
// ) {
//   const history = useHistory(symbol, period);

//   const candles =
//     history.data?.candles.map((candle) => ({
//       time: candle.timestamp.split("T")[0],
//       open: candle.open,
//       high: candle.high,
//       low: candle.low,
//       close: candle.close,
//     })) ?? [];

//   return {
//     ...history,
//     candles,
//   };
// }

import { useHistory } from "../../../hooks/useStocks";

export function useCandlestick(
  symbol: string,
  period = "1mo",
) {
  const history = useHistory(symbol, period);

  console.log(history);

  const candles =
    history.data?.candles?.map((candle) => ({
      time: candle.timestamp.split("T")[0],
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    })) ?? [];

  return {
    ...history,
    candles,
  };
}
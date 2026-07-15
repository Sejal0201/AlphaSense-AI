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

  // const candles =
  //   history.data?.candles?.map((candle) => ({
  //     time: candle.timestamp.split("T")[0],
  //     open: candle.open,
  //     high: candle.high,
  //     low: candle.low,
  //     close: candle.close,
  //   })) ?? [];
  const candles =
  history.data?.candles
    ?.filter(
      (candle) =>
        candle.open !== null &&
        candle.high !== null &&
        candle.low !== null &&
        candle.close !== null
    )
    .map((candle) => ({
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
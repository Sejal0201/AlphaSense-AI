import {
  createChart,
  HistogramSeries,
  LineSeries,
  ColorType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface Props {
  data: {
    time: string;
    macd: number;
    signal: number;
    histogram: number;
  }[];
}

export default function MACDChart({
  data,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 220,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#18181b",
        },
        textColor: "#d4d4d8",
      },

      grid: {
        vertLines: { color: "#27272a" },
        horzLines: { color: "#27272a" },
      },
    });

    const histogram = chart.addSeries(HistogramSeries);

    histogram.setData(
      data.map((item) => ({
        time: item.time,
        value: item.histogram,
        color:
          item.histogram >= 0
            ? "#22c55e"
            : "#ef4444",
      }))
    );

    const macdLine = chart.addSeries(LineSeries, {
      color: "#3B82F6",
      lineWidth: 2,
    });

    macdLine.setData(
      data.map((item) => ({
        time: item.time,
        value: item.macd,
      }))
    );

    const signalLine = chart.addSeries(LineSeries, {
      color: "#F59E0B",
      lineWidth: 2,
    });

    signalLine.setData(
      data.map((item) => ({
        time: item.time,
        value: item.signal,
      }))
    );

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data]);

  return (
    <div
      ref={ref}
      className="mt-6 rounded-2xl"
    />
  );
}
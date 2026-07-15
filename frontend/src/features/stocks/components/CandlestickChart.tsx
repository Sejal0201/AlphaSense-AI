import {
  ColorType,
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface IndicatorPoint {
  time: string;
  value: number;
}

interface Props {
  data: Candle[];

  sma20?: IndicatorPoint[];

  sma50?: IndicatorPoint[];

  ema20?: IndicatorPoint[];

  bollinger?: {
    upper: { time: string; value: number }[];
    middle: { time: string; value: number }[];
    lower: { time: string; value: number }[];
  };
}

export default function CandlestickChart({
  data,
  sma20,
  sma50,
  ema20,
  bollinger,
}: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 450,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#18181B",
        },
        textColor: "#D4D4D8",
      },

      grid: {
        vertLines: {
          color: "#27272A",
        },
        horzLines: {
          color: "#27272A",
        },
      },

      rightPriceScale: {
        borderColor: "#3F3F46",
      },

      timeScale: {
        borderColor: "#3F3F46",
      },
    });

    const series = chart.addSeries(CandlestickSeries);

    // series.setData(data);
    const validData = data.filter(
      (candle) =>
        candle.open != null &&
        candle.high != null &&
        candle.low != null &&
        candle.close != null,
    );

    series.setData(validData);
    if (sma20?.length) {
      const sma20Series = chart.addSeries(LineSeries, {
        color: "#3B82F6",
        lineWidth: 2,
      });

      sma20Series.setData(sma20);
    }

    if (sma50?.length) {
      const sma50Series = chart.addSeries(LineSeries, {
        color: "#9CA3AF",
        lineWidth: 2,
      });

      sma50Series.setData(sma50);
    }

    if (ema20?.length) {
      const ema20Series = chart.addSeries(LineSeries, {
        color: "#F59E0B",
        lineWidth: 2,
      });

      ema20Series.setData(ema20);
    }

    if (bollinger?.upper.length) {
      const upperSeries = chart.addSeries(LineSeries, {
        color: "#22C55E",
        lineWidth: 1,
      });

      upperSeries.setData(bollinger.upper);

      const middleSeries = chart.addSeries(LineSeries, {
        color: "#A855F7",
        lineWidth: 1,
      });

      middleSeries.setData(bollinger.middle);

      const lowerSeries = chart.addSeries(LineSeries, {
        color: "#22C55E",
        lineWidth: 1,
      });

      lowerSeries.setData(bollinger.lower);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (!chartContainerRef.current) return;

      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, sma20, sma50, ema20]);

  return <div ref={chartContainerRef} className="w-full" />;
}

import {
  createChart,
  LineSeries,
  ColorType,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface Props {
  data: {
    time: string;
    value: number;
  }[];
}

export default function RSIChart({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 180,

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

    const line = chart.addSeries(LineSeries, {
      color: "#3B82F6",
      lineWidth: 2,
    });

    line.setData(data);

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
"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
import { ChartData } from "chart.js";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

interface ILineProps {
  data: ChartData<"line", unknown, unknown>;
}

export const Chart = ({ data }: ILineProps) => {
  return <Line data={data} />;
};

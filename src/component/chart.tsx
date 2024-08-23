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
  const footer = (tooltipItems: any) => {
    let sum = 0;

    tooltipItems.forEach(function (tooltipItem: any) {
      sum += tooltipItem.parsed.y;
    });
    return "Sum: " + sum;
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index" as "index",
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          footer: footer,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

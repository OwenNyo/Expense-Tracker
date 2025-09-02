import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import CustomToolTip from "./CustomToolTip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}

          {showTextAnchor && (
            <Label
              position="center"
              content={({ viewBox }) => {
                const { cx, cy } = viewBox;
                return (
                  <>
                    <text
                      x={cx}
                      y={cy - 10}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="14px"
                    >
                      {label}
                    </text>
                    <text
                      x={cx}
                      y={cy + 15}
                      textAnchor="middle"
                      fill="#333"
                      fontSize="24px"
                      fontWeight="600"
                    >
                      {totalAmount}
                    </text>
                  </>
                );
              }}
            />
          )}
        </Pie>
        <Tooltip content={CustomToolTip} />
        <Legend content={CustomLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;

import React from "react";
import {
  CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis,
  YAxis
} from "recharts";

const LineChartComponent = ({ data }) => {
  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="stockPrice"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </>
  );
};

export default LineChartComponent;

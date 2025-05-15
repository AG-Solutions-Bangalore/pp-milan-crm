import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#0088FE", // Married - blue
  "#FF8042", // Unmarried - orange
  "#00C49F", // Male - green
  "#FFBB28", // Female - yellow
  "#AA336A", // Title BG - purple
];

const getMarriageData = (data) => [
  { name: "Married", value: data.married },
  { name: "Unmarried", value: data.unmarried },
];

const getGenderData = (data) => [
  { name: "Male", value: data.male },
  { name: "Female", value: data.female },
];

const renderCustomLabel = (props) => {
  const { cx, cy, midAngle, outerRadius, name, payload } = props;
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 40;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const lineStartX = cx + outerRadius * Math.cos(-midAngle * RADIAN);
  const lineStartY = cy + outerRadius * Math.sin(-midAngle * RADIAN);

  const lineEndX = x + (x > cx ? 10 : -10);

  return (
    <g>
      <polyline
        points={`${lineStartX},${lineStartY} ${x},${y} ${lineEndX},${y}`}
        fill="none"
        stroke="#333"
        strokeWidth={1}
      />
      <text
        x={lineEndX}
        y={y}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontWeight="bold"
        fontSize={12}
        fill="#333"
      >
        {`${name} (${payload.value})`}
      </text>
    </g>
  );
};

const renderCustomLabelWithRadius = (outerRadius) => (props) =>
  renderCustomLabel({ ...props, outerRadius });

const HalfHalfPieChart = ({ dashboardData }) => {
  const pandit = {
    married: dashboardData?.Pandituser_married_count,
    unmarried: dashboardData?.Pandituser_unmarried_count,
    male: dashboardData?.Pandituser_male_count,
    female: dashboardData?.Pandituser_female_count,
  };

  const prajapati = {
    married: dashboardData?.Prajapatiuser_married_count,
    unmarried: dashboardData?.Prajapatiuser_unmarried_count,
    male: dashboardData?.Prajapatiuser_male_count,
    female: dashboardData?.Prajapatiuser_female_count,
  };

  const renderPie = (title, data, colorOffset = 0) => {
    const totalCount =
      title === "Pandit"
        ? dashboardData?.Pandituser_count || 0
        : title === "Prajapati"
        ? dashboardData?.Prajapatiuser_count || 0
        : 0;
    return (
      <ResponsiveContainer width="45%" height={400}>
        <PieChart>
          <Pie
            data={getMarriageData(data)}
            dataKey="value"
            nameKey="name"
            innerRadius={45}
            outerRadius={80}
            isAnimationActive={false}
            stroke="none"
            label={renderCustomLabelWithRadius(100)}
          >
            {getMarriageData(data).map((_, idx) => (
              <Cell
                key={`marriage-${title}-${idx}`}
                fill={COLORS[(idx + colorOffset) % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>

          {/* Inner Pie - Gender */}
          <Pie
            data={getGenderData(data)}
            dataKey="value"
            nameKey="name"
            outerRadius={40}
            isAnimationActive={false}
            stroke="none"
            label={renderCustomLabelWithRadius(100)}
          >
            {getGenderData(data).map((_, idx) => (
              <Cell
                key={`gender-${title}-${idx}`}
                fill={COLORS[(idx + 2 + colorOffset) % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>

 
          <Pie
            data={[{ name: title, value: totalCount }]}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            innerRadius={85}
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={false}
            isAnimationActive={false}
            fill={COLORS[4]}
            stroke="none"
          >
            <Cell fill={COLORS[4]} stroke="none" />
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {renderPie("Pandit", pandit, 4)}
      {renderPie("Prajapati", prajapati, 6656)}
    </div>
  );
};

export default HalfHalfPieChart;

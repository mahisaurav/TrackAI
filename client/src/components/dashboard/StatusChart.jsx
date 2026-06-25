import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card, { CardHeader } from "../ui/Card";
import { CHART_COLORS } from "../../config/applications";

const FALLBACK_DATA = [
  { name: "Applied", value: 1 },
  { name: "Interview", value: 0 },
  { name: "Offer", value: 0 },
  { name: "Rejected", value: 0 },
];

function StatusChart({ data = [] }) {
  const chartData =
    data.some((d) => d.value > 0) ? data : FALLBACK_DATA;
  const total = chartData.reduce((sum, d) => sum + d.value, 0);
  const hasData = data.some((d) => d.value > 0);

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Status breakdown"
        subtitle={hasData ? `${total} total applications` : "No applications tracked yet"}
      />

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={78}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={CHART_COLORS[entry.name] || "#71717a"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2.5 mt-2">
        {chartData.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: CHART_COLORS[item.name] }}
              />
              <span className="text-zinc-300">{item.name}</span>
            </div>
            <span className="text-zinc-500 tabular-nums font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default StatusChart;

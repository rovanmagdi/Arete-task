import { Cell, PieChart, ResponsiveContainer } from "recharts";
import { Pie } from "recharts";
import { Chart } from "../../../types/global";
import Sekelton from "../../../components/Sekelton";

const PieChartComp = ({
  data,
  isLoading,
}: {
  data: Chart[];
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Sekelton className="w-full h-60" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#1d398fff"
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#1d398fff" : "#5aafc7ff"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PieChartComp;

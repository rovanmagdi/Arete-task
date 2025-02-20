import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart } from "../../../types/global";
import Sekelton from "../../../components/Sekelton";

const AreaChartComp = ({
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
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#1d398fff"
              fill="#1d398fff"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default AreaChartComp;

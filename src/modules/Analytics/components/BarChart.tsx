import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart } from "../../../types/global";
import Sekelton from "../../../components/Sekelton";

const BarChartComp = ({
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
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#5aafc7ff" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default BarChartComp;

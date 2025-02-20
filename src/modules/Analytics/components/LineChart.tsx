import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart } from "../../../types/global";
import Sekelton from "../../../components/Sekelton";

const LineChartComp = ({
  data,
  isLoading,
}: {
  data: Chart[];
  isLoading: boolean;
}) => {
  return (
    <>
      {" "}
      {isLoading ? (
        <Sekelton className="w-full h-60" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#1d398fff" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default LineChartComp;

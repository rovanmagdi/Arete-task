import { IChart } from "../types/types";
const url = "https://jsonplaceholder.typicode.com/posts";

export const getDataCharts = async (): Promise<IChart[]> => {
  const response = await fetch(url);
  const data = await response.json();
  return data.slice(0, 15).map((item: { id: number }, index: number) => ({
    name: `Item ${index + 1}`,
    value: item.id * 10,
  }));
};

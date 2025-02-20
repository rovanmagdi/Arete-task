import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import ChartContainer from "./components/ChartContainer";
import { IChart } from "./types/types";
import { getDataCharts } from "./requests/requests";
import Button from "../../components/Button";
import BarChartComp from "./components/BarChart";
import AreaChartComp from "./components/AreaChart";
import PieChartComp from "./components/PieChart";
import LineChartComp from "./components/LineChart";
import Reload from "../../assets/icons/reload.svg";

const initialChart: string[] = ["line", "bar", "pie", "area"];

const Analytics: React.FC = () => {
  const [chartSort, setChartSort] = useState<string[]>(initialChart);
  const { data = [], isLoading } = useQuery<IChart[]>({
    queryKey: ["charts"],
    queryFn: getDataCharts,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      const oldIndex = chartSort.indexOf(active?.id as string);
      const newIndex = chartSort.indexOf(over?.id as string);
      const newOrder = arrayMove(chartSort, oldIndex, newIndex);
      setChartSort(newOrder);
    }
  };
  const resetOrder = () => setChartSort(initialChart);


  return (
    <div className="p-4 w-full min-h-screen">
      <div className="flex justify-end"><Button
        onClick={resetOrder}
        text={<img src={Reload} alt="reset" className="h-5 w-5"/>}
        className="flex justify-end"
      /></div>
      

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={chartSort}
          strategy={verticalListSortingStrategy}
        >
          {chartSort.map((chart) => (
            <ChartContainer key={chart} id={chart}>
              {chart === "line" && (
                <LineChartComp data={data} isLoading={isLoading} />
              )}
              {chart === "bar" && (
                <BarChartComp data={data} isLoading={isLoading} />
              )}
              {chart === "area" && (
                <AreaChartComp data={data} isLoading={isLoading} />
              )}
              {chart === "pie" && (
                <PieChartComp data={data} isLoading={isLoading} />
              )}
            </ChartContainer>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Analytics;

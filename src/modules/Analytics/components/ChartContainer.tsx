import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ChartContainerProps {
  id: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg p-4 mb-4 cursor-grab border border-gray-300 bg-white mt-5 "
    >
      {children}
    </div>
  );
};

export default ChartContainer;

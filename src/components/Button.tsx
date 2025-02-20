import * as React from "react";

const Button = ({
  text,
  className,
  disabled,
  onClick,
}: {
  text: string|React.ReactElement;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`bg-blue-900 text-white px-4 py-2 rounded cursor-pointer hover:to-blue-400  ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

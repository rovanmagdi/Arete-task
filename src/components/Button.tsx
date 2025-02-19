const Button = ({
  text,
  className,
  disabled,
  onClick,
}: {
  text: string;
  className: string;
  disabled?: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`bg-primary ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

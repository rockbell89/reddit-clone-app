import classNames from "classnames";

interface InputGroupProps {
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string | undefined;
  setValue: (str: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  className = "my-2",
  type = "text",
  placeholder,
  error,
  value,
  setValue,
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        placeholder={placeholder}
        style={{ minWidth: 300 }}
        className={classNames(
          `w-full p-3 transition duration-300 border border-gray-400 bg-gray-50 focus:bg-white hover:bg-white`,
          {
            "border-red-500": error,
          }
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="text-red-500 font-medium">{error}</small>
    </div>
  );
};

export default InputGroup;

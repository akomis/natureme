import { Minus, Plus } from "lucide-react";

type Props = {
  value: number;
  setValue: (value: number) => void;
};

const MIN = 0;
const MAX = 99;

const NumberPicker = ({ value, setValue }: Props) => {
  const setValueWithLimits = (value: number) => {
    if (value >= MIN && value <= MAX) {
      setValue(value);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="join join-horizontal">
        <button
          className="btn join-item"
          onClick={() => setValueWithLimits(value - 1)}
        >
          <Minus />
        </button>
        <div className="btn join-item pointer-events-none text-lg w-10">
          {value}
        </div>
        <button
          className="btn join-item"
          onClick={() => setValueWithLimits(value + 1)}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};

export default NumberPicker;

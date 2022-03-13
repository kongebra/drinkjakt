import clsx from "clsx";
import React, { useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export interface PortionsProps {
  initialValue?: number;
  onChange: (value: number) => void;

  className?: string;
}

const Portions: React.FC<PortionsProps> = ({
  initialValue = 1,
  onChange,
  className,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(initialValue);

  const decrement = () => {
    changeValue(currentValue - 1);
  };
  const increment = () => {
    changeValue(currentValue + 1);
  };

  const changeValue = (value: number) => {
    const clamped = Math.max(value, 1);

    if (clamped != currentValue) {
      setCurrentValue(clamped);
      onChange(clamped);
    }

    ref.current!.value = `${clamped}`;
  };

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={clsx("flex flex-col items-center gap-1", className)}>
      <div className="flex justify-center items-start">
        <div className="flex justify-center items-center bg-slate-100 rounded-full p-1">
          <button
            type="button"
            className="bg-sky-500 text-white rounded-full h-8 w-8 flex justify-center items-center"
            onClick={decrement}
          >
            <FaMinus className="text-xl" />
          </button>
          <input
            ref={ref}
            type="text"
            id="portions"
            defaultValue={currentValue}
            className="w-16 h-8 p-0 text-center inline-block align-top my-0 mx-3 rounded font-bold pb-1 text-xl"
            onChange={(e) => {
              const { value } = e.currentTarget;
              const numValue = Number(value);
              if (isNaN(numValue)) {
                setTimeout(() => {
                  changeValue(initialValue);
                }, 100);
              } else {
                changeValue(numValue);
              }
            }}
          />
          <button
            type="button"
            className="bg-sky-500 text-white rounded-full h-8 w-8 flex justify-center items-center"
            onClick={increment}
          >
            <FaPlus className="text-xl" />
          </button>
        </div>
      </div>
      <label htmlFor="portions" className="uppercase font-semibold">
        Porsjoner
      </label>
    </div>
  );
};

export default Portions;

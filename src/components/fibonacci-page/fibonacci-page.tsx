import React, { useRef, useState } from "react";
import s from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { fib } from "./fibonacciUtils";
import { MAX_FIBONACCI_LIMIT } from "../../constants/constants";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fibSequence, setFibSequence] = useState<number[]>([]);
  const memoRef = useRef<Record<number, number>>({});

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = evt.target.value;
    if (newValue.length <= 2) {
      setInputValue(newValue);
    }
  };

  const onButtonClick = async () => {
    setIsLoading(true);
    const n = parseInt(inputValue, 10);

    if (isNaN(n)) {
      alert("Введите число");
      return;
    }

    setFibSequence([]);

    for (let i = 1; i <= n + 1; i++) {
      const newFibNumber = fib(i, memoRef.current);
      setFibSequence((prevFibSequence) => [...prevFibSequence, newFibNumber]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    }

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={s.container}>
        <Input
          onChange={onChange}
          min={1}
          max={MAX_FIBONACCI_LIMIT}
          isLimitText={true}
          value={inputValue}
          isLoader={isLoading}
          type={"number"}
        />
        <Button
          text="Рассчитать"
          disabled={
            !inputValue ||
            parseInt(inputValue, 10) > MAX_FIBONACCI_LIMIT ||
            parseInt(inputValue, 10) <= 0
          }
          onClick={onButtonClick}
          isLoader={isLoading}
        />
      </div>
      <div className={s.wrapper}>
        <div className={s.numbers}>
          {fibSequence.map((number, index) => (
            <Circle key={index} index={index} letter={String(number)} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};

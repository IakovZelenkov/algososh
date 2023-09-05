import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import s from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./stringUtils";

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [elementStates, setElementStates] = useState<ElementStates[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputValue(newInputValue);
    setElementStates(
      new Array(newInputValue.length).fill(ElementStates.Default)
    );
  };

  const onButtonClick = async () => {
    setIsLoading(true);

    const initialStateArray = new Array(inputValue.length).fill(
      ElementStates.Default
    );
    setElementStates(initialStateArray);

    const newLetters = inputValue.split("");
    setLetters(newLetters);

    await reverseString(newLetters, elementStates, setElementStates);
    setLetters([...newLetters]);

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={s.container}>
        <div className={s.wrapper}>
          <Input
            onChange={onChange}
            maxLength={11}
            isLimitText={true}
            value={inputValue}
            isLoader={isLoading}
          />
          <Button
            text="Развернуть"
            disabled={!inputValue}
            onClick={onButtonClick}
            isLoader={isLoading}
          />
        </div>
      </div>
      <div className={s.letters}>
        {letters.map((letter, index) => (
          <Circle key={index} letter={letter} state={elementStates[index]} />
        ))}
      </div>
    </SolutionLayout>
  );
};

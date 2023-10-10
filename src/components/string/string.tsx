import React, { useState } from "react";
import s from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./stringUtils";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [elementStates, setElementStates] = useState<ElementStates[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [originalInputValue, setOriginalInputValue] = useState("");

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
    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    await reverseString(newLetters, elementStates, setElementStates);
    setLetters([...newLetters]);

    setOriginalInputValue(inputValue);

    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={s.container}>
        <Input
          onChange={onChange}
          maxLength={11}
          isLimitText={true}
          value={inputValue}
          isLoader={isLoading}
          data-cy="input"
        />
        <Button
          text="Развернуть"
          disabled={!inputValue || inputValue === originalInputValue}
          onClick={onButtonClick}
          isLoader={isLoading}
          data-cy="button"
        />
      </div>
      <div className={s.letters}>
        {letters.map((letter, index) => (
          <Circle key={index} letter={letter} state={elementStates[index]} />
        ))}
      </div>
    </SolutionLayout>
  );
};

import React, { useRef, useState } from "react";
import s from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stackUtils";

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack<string>());
  const [inputValue, setInputValue] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [activeLoadingButton, setActiveLoadingButton] = useState<
    string | null
  >(null);
  const [stackItems, setStackItems] = useState<string[]>(
    stack.current.toArray()
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputValue(newInputValue);
  };

  const onPushButtonClick = async () => {
    setActiveLoadingButton("Добавить");
    setInputValue("");

    stack.current.push(inputValue);

    setStackItems([...stack.current.toArray()]);

    setIsChanging(true);
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setIsChanging(false);
    setActiveLoadingButton(null);
  };

  const onPopButtonClick = async () => {
    setActiveLoadingButton("Удалить");
    setIsChanging(true);

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    stack.current.pop();
    setStackItems([...stack.current.toArray()]);

    setIsChanging(false);
    setActiveLoadingButton(null);
  };

  const onClearButtonClick = () => {
    stack.current.clear();
    setStackItems([...stack.current.toArray()]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.wrapper}>
            <Input
              onChange={onChange}
              isLimitText={true}
              maxLength={4}
              value={inputValue}
              data-cy="input"
            />
            <Button
              text="Добавить"
              onClick={onPushButtonClick}
              isLoader={activeLoadingButton === "Добавить"}
              disabled={inputValue === ""}
              data-cy="add-button"
            />

            <Button
              text="Удалить"
              onClick={onPopButtonClick}
              isLoader={activeLoadingButton === "Удалить"}
              disabled={stackItems.length === 0}
              data-cy="delete-button"
            />
          </div>
          <Button
            text="Очистить"
            onClick={onClearButtonClick}
            disabled={stackItems.length === 0}
            data-cy="clear-button"
          />
        </div>
        <div className={s.items}>
          {stackItems.map((item, index) => {
            const isLast = index === stackItems.length - 1;
            return (
              <Circle
                key={index}
                index={index}
                letter={item}
                state={
                  isLast && isChanging
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={isLast ? "top" : ""}
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};

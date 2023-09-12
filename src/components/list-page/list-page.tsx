import React, { useRef, useState } from "react";
import s from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIndexValue, setInputIndexValue] = useState("");
  const [isChanging, setIsChanging] = useState(false);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputValue(newInputValue);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.wrapper}>
            <Input
              placeholder="Введите значение"
              extraClass={s.input}
              onChange={onChange}
              isLimitText={true}
              maxLength={4}
              value={inputValue}
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить в head"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить в tail"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить из head"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить из tail"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
          </div>
          <div className={s.wrapper}>
            <Input
              extraClass={s.input}
              placeholder="Введите индекс"
              onChange={onChange}
              value={inputValue}
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить по индексу"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить по индексу"
              onClick={() => {}}
              isLoader={false}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <div className={s.items}></div>
    </SolutionLayout>
  );
};

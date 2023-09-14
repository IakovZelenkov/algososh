import React, { useEffect, useRef, useState } from "react";
import s from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
// import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./listUtils";

export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

enum Operations {
  Default = "default",
  AddToHead = "addToHead",
  AddToTail = "addToTail",
  RemoveFromHead = "removeFromHead",
  RemoveFromTail = "removeFromTail",
  InsertAtIndex = "insertAtIndex",
  RemoveAtIndex = "removeAtIndex",
}

const INITIAL_LIST = ["0", "34", "8", "1"];

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList<string>());
  const [inputValue, setInputValue] = useState("");
  const [inputIndexValue, setInputIndexValue] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [elementStates, setElementStates] = useState<ElementStates[]>([]);
  const [lastOperation, setLastOperation] = useState<Operations>(
    Operations.Default
  );
  const [listItems, setListItems] = useState<string[]>(INITIAL_LIST);

  useEffect(() => {
    listItems.forEach((item) => linkedList.current.append(item));
  }, []);

  const onValueChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputValue(newInputValue);
  };

  const checkIsValidIndex = () => {
    const index = parseInt(inputIndexValue, 10);
    return index >= 0 && index < linkedList.current.getSize();
  };

  const onIndexChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputIndexValue(newInputValue);
  };

  const updateListItems = async () => {
    setListItems(linkedList.current.toArray());
  };

  const addToHead = async () => {
    setIsLoading(true);
    setLastOperation(Operations.AddToHead);

    linkedList.current.prepend(inputValue);
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const addToTail = async () => {
    setIsLoading(true);
    setLastOperation(Operations.AddToTail);

    linkedList.current.append(inputValue);
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const removeFromHead = async () => {
    setIsLoading(true);
    setLastOperation(Operations.RemoveFromHead);

    linkedList.current.removeHead();
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const removeFromTail = async () => {
    setIsLoading(true);
    setLastOperation(Operations.RemoveFromTail);

    linkedList.current.removeTail();
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const insertAtIndex = async () => {
    setIsLoading(true);
    setLastOperation(Operations.InsertAtIndex);

    const index = parseInt(inputIndexValue, 10);
    linkedList.current.insertAtIndex(inputValue, index);
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const removeAtIndex = async () => {
    setIsLoading(true);
    setLastOperation(Operations.RemoveAtIndex);

    const index = parseInt(inputIndexValue, 10);
    linkedList.current.removeAtIndex(index);
    updateListItems();

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.wrapper}>
            <Input
              placeholder="Введите значение"
              extraClass={s.input}
              onChange={onValueChange}
              isLimitText={true}
              maxLength={4}
              value={inputValue}
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить в head"
              onClick={addToHead}
              isLoader={isLoading && lastOperation === Operations.AddToHead}
              disabled={
                (isLoading && lastOperation !== Operations.AddToHead) ||
                !inputValue
              }
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить в tail"
              onClick={addToTail}
              isLoader={isLoading && lastOperation === Operations.AddToTail}
              disabled={
                (isLoading && lastOperation !== Operations.AddToTail) ||
                !inputValue
              }
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить из head"
              onClick={removeFromHead}
              isLoader={
                isLoading && lastOperation === Operations.RemoveFromHead
              }
              disabled={
                (isLoading && lastOperation !== Operations.RemoveFromHead) ||
                linkedList.current.getSize() === 0
              }
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить из tail"
              onClick={removeFromTail}
              isLoader={
                isLoading && lastOperation === Operations.RemoveFromTail
              }
              disabled={
                (isLoading && lastOperation !== Operations.RemoveFromTail) ||
                linkedList.current.getSize() === 0
              }
            />
          </div>
          <div className={s.wrapper}>
            <Input
              extraClass={s.input}
              placeholder="Введите индекс"
              type="number"
              onChange={onIndexChange}
              value={inputIndexValue}
            />
            <Button
              extraClass={s.flexGrow}
              text="Добавить по индексу"
              onClick={insertAtIndex}
              isLoader={
                isLoading && lastOperation === Operations.InsertAtIndex
              }
              disabled={
                (isLoading && lastOperation !== Operations.InsertAtIndex) ||
                !checkIsValidIndex() ||
                !inputValue
              }
            />
            <Button
              extraClass={s.flexGrow}
              text="Удалить по индексу"
              onClick={removeAtIndex}
              isLoader={
                isLoading && lastOperation === Operations.RemoveAtIndex
              }
              disabled={
                (isLoading && lastOperation !== Operations.RemoveAtIndex) ||
                !checkIsValidIndex() ||
                !inputValue
              }
            />
          </div>
        </div>
      </div>
      <div className={s.items}>
        {listItems.map((item, index) => {
          return (
            <Circle
              key={index}
              index={index}
              letter={item || ""}
              state={elementStates[index]}
              // head={head}
              // tail={tail}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};

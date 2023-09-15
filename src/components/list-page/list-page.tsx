import React, { useEffect, useRef, useState } from "react";
import s from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "./listUtils";
import { Operations, Positions } from "../../types/list-types";
import { INITIAL_LIST } from "../../constants/constants";

export const ListPage: React.FC = () => {
  const linkedList = useRef(new LinkedList<string>());
  const [inputValue, setInputValue] = useState("");
  const [inputIndexValue, setInputIndexValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listItems, setListItems] = useState<string[]>(INITIAL_LIST);
  const [currentElement, setCurrentElement] = useState("");
  const [lastOperation, setLastOperation] = useState<Operations>(
    Operations.Default
  );
  const [modifiedIndex, setModifiedIndex] = useState<number | undefined>(
    undefined
  );
  const [changingIndex, setChangingIndex] = useState<number | undefined>(
    undefined
  );
  const [smallCircleIndex, setSmallCircleIndex] = useState<number | undefined>(
    undefined
  );
  const [smallCirclePosition, setSmallCirclePosition] = useState<
    Positions | undefined
  >(undefined);

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

  const commonLogic = async (
    listActions: () => void,
    operation: Operations,
    smallCirclePosition: Positions,
    smallCircleIndex: number,
    modifiedIndex?: number
  ) => {
    setIsLoading(true);
    setLastOperation(operation);

    if (
      operation === Operations.RemoveFromHead ||
      operation === Operations.RemoveFromTail
    ) {
      setListItems((prev) =>
        operation === Operations.RemoveFromHead
          ? ["", ...prev.slice(1)]
          : [...prev.slice(0, listItems.length - 1), ""]
      );
    }

    listActions();

    setSmallCirclePosition(smallCirclePosition);
    setSmallCircleIndex(smallCircleIndex);

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setSmallCircleIndex(undefined);

    setModifiedIndex(modifiedIndex);

    updateListItems();

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setModifiedIndex(undefined);
    setSmallCirclePosition(undefined);

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const commonIndexLogic = async (
    actions: () => void,
    index: number,
    operation: Operations,
    smallCirclePosition: Positions
  ) => {
    setIsLoading(true);
    setLastOperation(operation);
    setSmallCirclePosition(smallCirclePosition);

    let currentIndex = 0;
    while (currentIndex <= index) {
      setChangingIndex(currentIndex - 1);
      if (operation === Operations.InsertAtIndex) {
        setSmallCircleIndex(currentIndex);
      }

      await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      currentIndex++;
    }
    if (operation === Operations.RemoveAtIndex) {
      setSmallCircleIndex(index);
      setListItems((prev) => prev.map((item, i) => (i === index ? "" : item)));
    }
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    actions();
    setSmallCircleIndex(undefined);
    setModifiedIndex(index);
    updateListItems();

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setModifiedIndex(undefined);
    setSmallCirclePosition(undefined);
    setChangingIndex(undefined);

    setIsLoading(false);
    setLastOperation(Operations.Default);
  };

  const addToHead = async () => {
    setCurrentElement(inputValue);
    await commonLogic(
      () => {
        linkedList.current.prepend(inputValue);
      },
      Operations.AddToHead,
      Positions.Top,
      0,
      0
    );
    setInputValue("");
  };

  const addToTail = async () => {
    setCurrentElement(inputValue);
    commonLogic(
      () => {
        linkedList.current.append(inputValue);
      },
      Operations.AddToTail,
      Positions.Top,
      listItems.length - 1,
      listItems.length
    );
    setInputValue("");
  };

  const removeFromHead = async () => {
    setCurrentElement(listItems[0]);
    commonLogic(
      () => {
        linkedList.current.removeHead();
      },
      Operations.RemoveFromHead,
      Positions.Bottom,
      0
    );
  };

  const removeFromTail = async () => {
    setCurrentElement(listItems[listItems.length - 1]);
    commonLogic(
      () => {
        linkedList.current.removeTail();
      },
      Operations.RemoveFromTail,
      Positions.Bottom,
      listItems.length - 1
    );
  };

  const insertAtIndex = async () => {
    const index = parseInt(inputIndexValue, 10);
    setCurrentElement(inputValue);
    await commonIndexLogic(
      () => {
        linkedList.current.insertAtIndex(inputValue, index);
      },
      index,
      Operations.InsertAtIndex,
      Positions.Top
    );
    setInputValue("");
    setInputIndexValue("");
  };

  const removeAtIndex = async () => {
    const index = parseInt(inputIndexValue, 10);
    setCurrentElement(listItems[index]);
    await commonIndexLogic(
      () => {
        linkedList.current.removeAtIndex(index);
      },
      index,
      Operations.RemoveAtIndex,
      Positions.Bottom
    );
    setInputIndexValue("");
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
              disabled={isLoading}
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
                listItems.length === 0
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
                listItems.length === 0
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
              disabled={isLoading}
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
                !checkIsValidIndex()
              }
            />
          </div>
        </div>
      </div>
      <div className={s.items}>
        {listItems.map((item, index) => {
          const currentState =
            modifiedIndex === index
              ? ElementStates.Modified
              : changingIndex! >= index
              ? ElementStates.Changing
              : ElementStates.Default;

          return (
            <Circle
              key={index}
              index={index}
              letter={item || ""}
              state={currentState}
              head={
                smallCirclePosition === Positions.Top &&
                smallCircleIndex === index ? (
                  <Circle
                    letter={currentElement}
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : index === 0 ? (
                  "head"
                ) : (
                  ""
                )
              }
              tail={
                smallCirclePosition === Positions.Bottom &&
                smallCircleIndex === index ? (
                  <Circle
                    letter={currentElement}
                    state={ElementStates.Changing}
                    isSmall
                  />
                ) : index === listItems.length - 1 ? (
                  "tail"
                ) : (
                  ""
                )
              }
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};

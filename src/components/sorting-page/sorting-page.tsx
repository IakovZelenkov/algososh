import React, { useState, useEffect } from "react";
import s from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";

import {
  randomArr,
  bubbleSort,
  selectionSort,
  shuffleArray,
} from "./sortingUtlis";

export const SortingPage: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<string>("Выбор");
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const [elementStates, setElementStates] = useState<ElementStates[]>([]);
  const [activeLoadingButton, setActiveLoadingButton] =
    useState<Direction | null>(null);

  const handleSort = async (direction: Direction) => {
    setActiveLoadingButton(direction);
    if (sortMethod === "Пузырек") {
      await bubbleSort(
        randomArray,
        direction === Direction.Ascending ? "Ascending" : "Descending",
        setElementStates
      );
    } else {
      await selectionSort(
        randomArray,
        direction === Direction.Ascending ? "Ascending" : "Descending",
        setElementStates
      );
    }

    setActiveLoadingButton(null);
  };

  const handleSortMethodChange = (method: string) => {
    setSortMethod(method);
  };

  const handleNewArray = () => {
    const newArr = randomArr();
    setRandomArray(newArr);
    setElementStates(new Array(newArr.length).fill(ElementStates.Default));
  };

  const handleShuffle = () => {
    shuffleArray(randomArray);
    setRandomArray([...randomArray]);
    setElementStates(
      new Array(randomArray.length).fill(ElementStates.Default)
    );
  };

  useEffect(() => {
    handleNewArray();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.radioInputs}>
            <RadioInput
              label="Выбор"
              onChange={() => handleSortMethodChange("Выбор")}
              checked={sortMethod === "Выбор"}
              disabled={activeLoadingButton !== null}
            />
            <RadioInput
              label="Пузырек"
              onChange={() => handleSortMethodChange("Пузырек")}
              checked={sortMethod === "Пузырек"}
              disabled={activeLoadingButton !== null}
            />
          </div>
          <div className={s.directionButtons}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => handleSort(Direction.Ascending)}
              isLoader={activeLoadingButton === Direction.Ascending}
              disabled={
                (activeLoadingButton !== Direction.Ascending &&
                  activeLoadingButton !== null) ||
                randomArray.length === 0
              }
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => handleSort(Direction.Descending)}
              isLoader={activeLoadingButton === Direction.Descending}
              disabled={
                (activeLoadingButton !== Direction.Descending &&
                  activeLoadingButton !== null) ||
                randomArray.length === 0
              }
            />
          </div>
          <div className={s.arrayButtons}>
            <Button
              text="Новый массив"
              onClick={handleNewArray}
              disabled={activeLoadingButton !== null}
            />
            <Button
              text="Перемешать"
              onClick={handleShuffle}
              disabled={
                activeLoadingButton !== null || randomArray.length === 0
              }
            />
          </div>
        </div>
        <div className={s.columns}>
          {randomArray.map((item, index) => (
            <Column index={item} key={index} state={elementStates[index]} />
          ))}
        </div>
      </div>
    </SolutionLayout>
  );
};

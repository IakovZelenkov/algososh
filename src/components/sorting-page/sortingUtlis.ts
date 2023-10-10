import { ElementStates } from "../../types/element-states";
import { Dispatch, SetStateAction } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const randomArr = () => {
  const length = Math.floor(Math.random() * 15) + 3;
  const arr = Array.from({ length }, () => Math.floor(Math.random() * 101));
  return arr;
};

export const shuffleArray = (array: number[]): void => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j);
  }
};

const swap = (
  arr: number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const bubbleSort = async (
  array: number[],
  sortDirection: "Ascending" | "Descending",
  setElementStates?: Dispatch<SetStateAction<ElementStates[]>>
): Promise<void> => {
  const n = array.length;
  let newStates = new Array(n).fill(ElementStates.Default);

  for (let i = 0; i < n - 1; i++) {
    let isSorted = true;

    for (let j = 0; j < n - i - 1; j++) {
      newStates[j] = ElementStates.Changing;
      newStates[j + 1] = ElementStates.Changing;

      if (setElementStates) {
        setElementStates((prevStates) =>
          prevStates.map((state, index) => newStates[index])
        );

        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      }

      if (
        (sortDirection === "Ascending" && array[j] > array[j + 1]) ||
        (sortDirection === "Descending" && array[j] < array[j + 1])
      ) {
        swap(array, j, j + 1);
        isSorted = false;
      }

      newStates[j] = ElementStates.Default;
      newStates[j + 1] = ElementStates.Default;
    }

    newStates[n - i - 1] = ElementStates.Modified;
    setElementStates &&
      setElementStates((prevStates) =>
        prevStates.map((state, index) => newStates[index])
      );

    if (isSorted) break;
  }

  setElementStates &&
    setElementStates((prevStates) =>
      prevStates.map((state, index) =>
        state === ElementStates.Default ? ElementStates.Modified : state
      )
    );
};

export const selectionSort = async (
  array: number[],
  sortDirection: "Ascending" | "Descending",
  setElementStates?: Dispatch<SetStateAction<ElementStates[]>>
): Promise<void> => {
  const n = array.length;
  let newStates = new Array(n).fill(ElementStates.Default);

  for (let i = 0; i < n - 1; i++) {
    let selectedIndex = i;
    newStates[i] = ElementStates.Changing;
    if (setElementStates) {
      setElementStates([...newStates]);
    }

    for (let j = i + 1; j < n; j++) {
      newStates[j] = ElementStates.Changing;

      if (setElementStates) {
        setElementStates([...newStates]);
        await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
      }

      const shouldSwap =
        (sortDirection === "Ascending" && array[j] < array[selectedIndex]) ||
        (sortDirection === "Descending" && array[j] > array[selectedIndex]);

      if (shouldSwap) {
        selectedIndex = j;
      }

      newStates[j] = ElementStates.Default;
      if (setElementStates) {
        setElementStates([...newStates]);
      }
    }

    if (selectedIndex !== i) {
      swap(array, i, selectedIndex);
    }

    newStates[i] = ElementStates.Modified;
    if (setElementStates) {
      setElementStates([...newStates]);
    }
  }

  newStates[n - 1] = ElementStates.Modified;
  if (setElementStates) {
    setElementStates([...newStates]);
  }
};

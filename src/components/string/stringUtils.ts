import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Dispatch, SetStateAction } from "react";

export const reverseString = async (
  array: string[],
  elementStates: ElementStates[],
  setElementStates: Dispatch<SetStateAction<ElementStates[]>>
): Promise<void> => {
  let start = 0;
  let end = array.length - 1;
  const tempStates = [...elementStates];

  while (start < end) {
    tempStates[start] = ElementStates.Changing;
    tempStates[end] = ElementStates.Changing;
    setElementStates([...tempStates]);

    await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));

    [array[start], array[end]] = [array[end], array[start]];

    tempStates[start] = ElementStates.Modified;
    tempStates[end] = ElementStates.Modified;
    setElementStates([...tempStates]);

    start++;
    end--;
  }

  if (array.length % 2 !== 0) {
    tempStates[Math.floor(array.length / 2)] = ElementStates.Modified;
  }

  setElementStates([...tempStates]);
};

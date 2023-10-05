import { ElementStates } from "../../types/element-states";
import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";

export const reverseString = async (
  array: string[],
  elementStates?: ElementStates[],
  setElementStates?: Dispatch<SetStateAction<ElementStates[]>>
): Promise<void> => {
  let start = 0;
  let end = array.length - 1;

  while (start < end) {
    if (elementStates && setElementStates) {
      elementStates[start] = ElementStates.Changing;
      elementStates[end] = ElementStates.Changing;
      setElementStates([...elementStates]);
      await new Promise((resolve) => setTimeout(resolve, DELAY_IN_MS));
    }

    [array[start], array[end]] = [array[end], array[start]];

    if (elementStates && setElementStates) {
      elementStates[start] = ElementStates.Modified;
      elementStates[end] = ElementStates.Modified;
      setElementStates([...elementStates]);
    }

    start++;
    end--;
  }

  if (array.length % 2 !== 0 && elementStates && setElementStates) {
    elementStates[Math.floor(array.length / 2)] = ElementStates.Modified;
    setElementStates([...elementStates]);
  }
};

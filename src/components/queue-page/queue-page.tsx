import React, { useRef, useState } from "react";
import s from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queueUtils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { MAX_QUEUE_LENGTH } from "../../constants/constants";
import { Operations } from "../../types/queue-types";

export const QueuePage: React.FC = () => {
  const queue = useRef(new Queue<string>(MAX_QUEUE_LENGTH));
  const [inputValue, setInputValue] = useState("");
  const [isChanging, setIsChanging] = useState(false);
  const [lastOperation, setLastOperation] = useState<Operations>(
    Operations.Clear
  );
  const [activeLoadingButton, setActiveLoadingButton] = useState<
    string | null
  >(null);
  const [queueItems, setQueueItems] = useState<(string | null)[]>(
    queue.current.toArray()
  );

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = evt.target.value;
    setInputValue(newInputValue);
  };

  const onEnqueueButtonClick = async (operation: Operations) => {
    setActiveLoadingButton("Добавить");
    setLastOperation(operation);
    setIsChanging(true);

    try {
      queue.current.enqueue(inputValue);
      setQueueItems([...queue.current.toArray()]);
    } catch (error) {
      console.error("Error enqueueing:", error);
    }

    setInputValue("");
    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));
    setIsChanging(false);
    setActiveLoadingButton(null);
  };

  const onDequeueButtonClick = async (operation: Operations) => {
    setActiveLoadingButton("Удалить");
    setIsChanging(true);
    setLastOperation(operation);

    try {
      queue.current.dequeue();
      setQueueItems([...queue.current.toArray()]);
    } catch (error) {
      console.error("Error enqueueing:", error);
    }

    await new Promise((resolve) => setTimeout(resolve, SHORT_DELAY_IN_MS));

    setIsChanging(false);
    setActiveLoadingButton(null);
  };

  const onClearButtonClick = (operation: Operations) => {
    setLastOperation(operation);
    queue.current.clear();
    setQueueItems([...queue.current.toArray()]);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={s.container}>
        <div className={s.menu}>
          <div className={s.wrapper}>
            <Input
              onChange={onChange}
              isLimitText={true}
              maxLength={4}
              value={inputValue}
            />
            <Button
              text="Добавить"
              onClick={() => {
                onEnqueueButtonClick(Operations.Enqueue);
              }}
              isLoader={activeLoadingButton === "Добавить"}
              disabled={
                inputValue === "" ||
                queue.current.getTail() === MAX_QUEUE_LENGTH - 1 ||
                queue.current.isFull()
              }
            />

            <Button
              text="Удалить"
              onClick={() => {
                onDequeueButtonClick(Operations.Dequeue);
              }}
              isLoader={activeLoadingButton === "Удалить"}
              disabled={queue.current.isEmpty()}
            />
          </div>
          <Button
            text="Очистить"
            onClick={() => {
              onClearButtonClick(Operations.Clear);
            }}
            disabled={lastOperation === Operations.Clear}
          />
        </div>
        <div className={s.items}>
          {queueItems.map((item, index) => {
            const isHead = queue.current.getHead() === index;
            const isTail = queue.current.getTail() === index;

            return (
              <Circle
                key={index}
                index={index}
                letter={item || ""}
                state={
                  isChanging &&
                  ((lastOperation === Operations.Enqueue && isTail) ||
                    (lastOperation === Operations.Dequeue && isHead))
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={
                  isHead && lastOperation !== Operations.Clear ? "head" : ""
                }
                tail={
                  isTail && lastOperation !== Operations.Clear ? "tail" : ""
                }
              />
            );
          })}
        </div>
      </div>
    </SolutionLayout>
  );
};

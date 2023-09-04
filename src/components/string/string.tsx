import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import s from "./string.module.css";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <div className={s.container}>
        <div className={s.wrapper}>
          <Input />
          <Button text="Развернуть" />
        </div>
        <span className={`${s.text} text_type_input-lim`}>
          Максимум — 11 символов
        </span>
      </div>
    </SolutionLayout>
  );
};

import React, { FC, useState } from "react";
import { ArticleStore } from "../store/types";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface ReactHookProps<T extends FieldValues> {
  className?: string;
  defaultValue: string;
  placeholder: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  onBlur: (update: any) => void;
}

const ReactHookInput = <T extends FieldValues>({
  className,
  defaultValue,
  name,
  placeholder,
  register,
  onBlur,
}: ReactHookProps<T>) => {
  return (
    <input
      type="text"
      className={className || "form-control form-control-lg"}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...register(name, {
        onBlur: (e) => {
          onBlur({ [name]: e.target.value });
        },
      })}
    />
  );
};

export default ReactHookInput;

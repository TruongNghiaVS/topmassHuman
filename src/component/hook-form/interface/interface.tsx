import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";

export type Option = {
  label: string;
  value: string;
};

export interface ITmInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: any;
  placeholder?: string;
  type?: string;
}

export interface ITmSelect extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: any;
  options: Option[];
  placeholder?: string;
}

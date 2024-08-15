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

export interface IUpload extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
}

export interface ITmSelect extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: any;
  options: Option[];
  placeholder?: string;
}

export interface ITmRadioProps {
  name: string;
  control: Control<any>;
  options: Option[];
  classNameCustom?: string;
}

export interface SearchSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
}

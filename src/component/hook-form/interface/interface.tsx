import { InputHTMLAttributes } from "react";
import { Control, UseControllerProps } from "react-hook-form";

export type Option = {
  label: string;
  value: any;
};

export interface ITmInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: any;
  placeholder?: string;
  type?: string;
  classNameCustom?: string;
}

export interface ITmInputNumber extends ITmInput {
  min?: number;
  max?: number;
  step?: number;
}

export interface IUpload extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  avatarLink?: string;
  control: Control<any>;
  classNameImg?: string;
  title?: string;
  classNameCustomShowFile?: string;
}

export interface ITmSelect extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  control: Control<any>;
  label?: string;
  icon?: any;
  options: Option[];
  placeholder?: string;
  classNameCustom?: string;
}

export interface ITmRadioProps {
  name: string;
  control: Control<any>;
  options: Option[];
  classNameCustom?: string;
}

export interface SearchSelectProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  customSelect?: () => void;
}

export interface CKEditorInputProps extends UseControllerProps {
  control: Control<any>;
}

export interface ITmTextareaProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export interface ITmCheckBox extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label: any;
}

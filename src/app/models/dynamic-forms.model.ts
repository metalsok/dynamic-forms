import {Validators} from '@angular/forms';

export interface DynamicOptions {
  label: string;
  value: string;
}

export interface DynamicControl<T = string | number | boolean> {
  controlType: 'input' | 'select' | 'checkbox' | 'group' | 'textarea' | 'radio' | 'number'; //| 'array';
  type?: string;
  label: string;
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  value: T | null;
  options?: DynamicOptions[];
  controls?: DynamicFormsConfig['controls'] //| DynamicControl[]
  validators?: {
    [key in ValidatorKeys]?: unknown
  }
}

export interface DynamicFormsConfig {
  description: string;
  controls: {
    [key: string]: DynamicControl
  }
}

type CustomValidators = {}
type ValidatorKeys = keyof Omit<typeof Validators & CustomValidators, 'prototype' | 'compose' | 'composeAsync'>

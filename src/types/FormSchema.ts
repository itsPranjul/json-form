// src/types/FormSchema.ts
export interface FormFieldOption {
    value: string;
    label: string;
  }
  
  export interface FormFieldValidation {
    pattern: string;
    message: string;
  }
  
  export interface FormField {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    options?: FormFieldOption[];
    validation?: FormFieldValidation;
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
  }
  
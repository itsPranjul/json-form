// src/components/DynamicForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormSchema, FormField } from '../types/FormSchema';

interface DynamicFormProps {
  schema: FormSchema;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.id,
      placeholder: field.placeholder,
      className: "w-full p-2 border rounded mt-1",
    };

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <Controller
            name={field.id}
            control={control}
            rules={{
                required: field.required ? `${field.label} is required` : false,
                pattern: field.validation?.pattern 
                  ? { 
                      value: new RegExp(field.validation.pattern || ''), 
                      message: field.validation?.message || 'Invalid input' 
                    } 
                  : undefined
              }}
            render={({ field: inputProps }) => (
              <div>
                <input
                  {...commonProps}
                  {...inputProps}
                  type={field.type}
                />
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.id}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: selectProps }) => (
              <div>
                <select {...commonProps} {...selectProps}>
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        );

      case 'radio':
        return (
          <Controller
            name={field.id}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: radioProps }) => (
              <div>
                {field.options?.map(option => (
                  <label key={option.value} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      {...radioProps}
                      value={option.value}
                      checked={radioProps.value === option.value}
                      className="form-radio"
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.id}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: textareaProps }) => (
              <div>
                <textarea
                  {...commonProps}
                  {...textareaProps}
                  rows={4}
                />
                {errors[field.id] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.id]?.message as string}
                  </p>
                )}
              </div>
            )}
          />
        );
    }
  };

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully!');
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">{schema.formTitle}</h2>
      <p className="mb-6 text-gray-600">{schema.formDescription}</p>

      {schema.fields.map(field => (
        <div key={field.id} className="mb-4">
          <label 
            htmlFor={field.id} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
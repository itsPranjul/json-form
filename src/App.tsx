import React, { useState } from 'react';
import JSONEditor from './components/JSONEditor';
import DynamicForm from './components/DynamicForm';
import { FormSchema } from './types/FormSchema';

const initialSchema: FormSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name"
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address"
      }
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" }
      ]
    }
  ]
};

const App: React.FC = () => {
  const [formSchema, setFormSchema] = useState<FormSchema>(initialSchema);

  const handleSchemaChange = (newSchema: FormSchema) => {
    setFormSchema(newSchema);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 p-4 bg-gray-100 overflow-auto">
        <h2 className="text-xl font-bold mb-4">JSON Schema Editor</h2>
        <JSONEditor 
          initialSchema={initialSchema} 
          onSchemaChange={handleSchemaChange} 
        />
      </div>
      <div className="w-full md:w-1/2 p-4 bg-white overflow-auto">
        <h2 className="text-xl font-bold mb-4">Form Preview</h2>
        <DynamicForm schema={formSchema} />
      </div>
    </div>
  );
};

export default App;
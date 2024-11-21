import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { FormSchema } from '../types/FormSchema';

interface JSONEditorProps {
  initialSchema: FormSchema;
  onSchemaChange: (schema: FormSchema) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ initialSchema, onSchemaChange }) => {
  const [jsonContent, setJsonContent] = useState<string>(
    JSON.stringify(initialSchema, null, 2)
  );
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (value: string) => {
    setJsonContent(value);

    try {
      const parsedSchema = JSON.parse(value) as FormSchema;
      
      // Validate schema structure
      if (!parsedSchema.formTitle || !parsedSchema.fields) {
        throw new Error('Invalid schema structure');
      }

      setError(null);
      onSchemaChange(parsedSchema);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow overflow-auto border rounded">
        <CodeMirror
          value={jsonContent}
          height="100%"
          extensions={[json(), oneDark]}
          onChange={handleJsonChange}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            syntaxHighlighting: true,
          }}
        />
      </div>
      {error && (
        <div className="bg-red-500 text-white p-2 mt-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default JSONEditor;

import React, { useState } from 'react';
import { Check, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript',
  title
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      {title && (
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="text-sm font-medium">{title}</div>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-gray-500" 
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <ClipboardCopy className="h-4 w-4" />
              )}
              <span className="ml-2 text-xs">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
          </div>
        </div>
      )}
      <pre className="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 text-sm font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;

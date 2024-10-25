import { AlertCircle, Copy, Maximize2, Minimize2, Clipboard, Binary } from 'lucide-react';
import { useState } from 'react';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

export function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const [copied, setCopied] = useState(false);
  const [pasteEnabled, setPasteEnabled] = useState(true);
  const [isUnicodeMode, setIsUnicodeMode] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
      setPasteEnabled(false);
      setTimeout(() => setPasteEnabled(true), 1000);
    } catch (e) {
      console.error('Failed to paste:', e);
    }
  };

  const handleFormat = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(value), null, 2);
      onChange(formatted);
    } catch (e) {
      // If JSON is invalid, keep the current value
    }
  };

  const handleMinify = () => {
    try {
      const minified = JSON.stringify(JSON.parse(value));
      onChange(minified);
    } catch (e) {
      // If JSON is invalid, keep the current value
    }
  };

  const handleUnicodeToggle = () => {
    try {
      const parsed = JSON.parse(value);
      
      const processString = (str: string, encode: boolean) => {
        if (encode) {
          return str.replace(/[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, char => {
            return '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
          });
        } else {
          return str.replace(/\\u[\dA-F]{4}/gi, match =>
            String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
          );
        }
      };

      const converted = JSON.stringify(parsed, (key, value) => {
        if (typeof value === 'string') {
          return processString(value, !isUnicodeMode);
        }
        return value;
      }, 2);
      
      onChange(converted);
      setIsUnicodeMode(!isUnicodeMode);
    } catch (e) {
      // If JSON is invalid, keep the current value
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={handleFormat}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Maximize2 className="w-4 h-4 mr-1" />
          美化
        </button>
        <button
          onClick={handleMinify}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Minimize2 className="w-4 h-4 mr-1" />
          压缩
        </button>
        <button
          onClick={handleUnicodeToggle}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Binary className="w-4 h-4 mr-1" />
          {isUnicodeMode ? '解码' : '编码'}
        </button>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Copy className="w-4 h-4 mr-1" />
          {copied ? '已复制!' : '复制'}
        </button>
        <button
          onClick={handlePaste}
          disabled={!pasteEnabled}
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${
            pasteEnabled
              ? 'text-gray-700 bg-white hover:bg-gray-50'
              : 'text-gray-400 bg-gray-100'
          } border border-gray-300 rounded-md transition-colors`}
        >
          <Clipboard className="w-4 h-4 mr-1" />
          粘贴
        </button>
      </div>
      <textarea
        className={`w-full h-[400px] p-4 font-mono text-sm bg-gray-50 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="在此粘贴JSON数据..."
      />
      {error && (
        <div className="mt-2 flex items-center text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
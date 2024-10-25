import React, { useState } from 'react';
import { X, ArrowDownUp } from 'lucide-react';

interface UnicodeConverterProps {
  onClose: () => void;
}

export function UnicodeConverter({ onClose }: UnicodeConverterProps) {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutput(encodeToUnicode(input));
    } else {
      setOutput(decodeFromUnicode(input));
    }
  };

  const encodeToUnicode = (str: string) => {
    return str.split('').map(char => {
      const hex = char.charCodeAt(0).toString(16).toUpperCase();
      return '\\u' + '0000'.substring(0, 4 - hex.length) + hex;
    }).join('');
  };

  const decodeFromUnicode = (str: string) => {
    try {
      return str.replace(/\\u[\dA-F]{4}/gi, match =>
        String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
      );
    } catch (error) {
      return '解码失败，请检查输入格式';
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Unicode 转换器</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? '输入文本' : '输入Unicode'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-3 py-2 border rounded-md resize-none"
            placeholder={mode === 'encode' ? '输入要编码的文本...' : '输入要解码的Unicode...'}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleMode}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowDownUp className="w-4 h-4 mr-2" />
            切换模式
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'encode' ? 'Unicode结果' : '解码结果'}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 px-3 py-2 border rounded-md bg-gray-50 resize-none"
            placeholder={mode === 'encode' ? 'Unicode编码将显示在这里...' : '解码结果将显示在这里...'}
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {mode === 'encode' ? '编码' : '解码'}
        </button>
      </div>
    </div>
  );
}
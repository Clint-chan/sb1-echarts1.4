import React, { useState } from 'react';
import { X, Copy, RefreshCw } from 'lucide-react';

interface PasswordGeneratorProps {
  onClose: () => void;
}

export function PasswordGenerator({ onClose }: PasswordGeneratorProps) {
  const [password, setPassword] = useState('');
  const [basePassword, setBasePassword] = useState('');
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSpecial) chars += special;

    if (!chars) {
      setPassword('请选择至少一个字符类型');
      return;
    }

    let result = basePassword;
    const remainingLength = length - basePassword.length;

    if (remainingLength > 0) {
      for (let i = 0; i < remainingLength; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    // Shuffle the result to make it more random
    result = result.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(result);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">密码生成器</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            基础密码（可选）
          </label>
          <input
            type="text"
            value={basePassword}
            onChange={(e) => setBasePassword(e.target.value)}
            placeholder="输入基础密码..."
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            最终密码长度: {length}
          </label>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm">大写字母 (A-Z)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm">小写字母 (a-z)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm">数字 (0-9)</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useSpecial}
              onChange={(e) => setUseSpecial(e.target.checked)}
              className="rounded text-blue-600"
            />
            <span className="text-sm">特殊字符 (!@#$%^&*)</span>
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          生成密码
        </button>

        {password && (
          <div className="mt-4">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <span className="font-mono text-sm">{password}</span>
              <button
                onClick={copyToClipboard}
                className="text-gray-500 hover:text-gray-700"
                title="复制密码"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 mt-1">密码已复制到剪贴板</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
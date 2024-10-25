import React, { useState } from 'react';
import { X, Copy } from 'lucide-react';

interface CrontabGeneratorProps {
  onClose: () => void;
}

export function CrontabGenerator({ onClose }: CrontabGeneratorProps) {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [copied, setCopied] = useState(false);

  const getCronExpression = () => {
    return `${minute} ${hour} ${day} ${month} ${weekday}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(getCronExpression());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { name: '每分钟', value: '* * * * *' },
    { name: '每小时', value: '0 * * * *' },
    { name: '每天午夜', value: '0 0 * * *' },
    { name: '每周日午夜', value: '0 0 * * 0' },
    { name: '每月1号午夜', value: '0 0 1 * *' },
  ];

  const applyPreset = (value: string) => {
    const [m, h, d, mon, w] = value.split(' ');
    setMinute(m);
    setHour(h);
    setDay(d);
    setMonth(mon);
    setWeekday(w);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Crontab 生成器</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分钟 (0-59)</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">小时 (0-23)</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">日期 (1-31)</label>
            <input
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">月份 (1-12)</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">星期 (0-6)</label>
            <input
              type="text"
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">常用表达式</h3>
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => applyPreset(preset.value)}
                className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <code className="text-sm">{getCronExpression()}</code>
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-gray-700"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-1">已复制到剪贴板</p>
          )}
        </div>
      </div>
    </div>
  );
}
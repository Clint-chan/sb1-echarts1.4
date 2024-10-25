import React, { useState } from 'react';
import { BarChart3, PieChart, LineChart, Github, ListTodo, KeyRound, Calendar } from 'lucide-react';
import { JsonEditor } from './components/JsonEditor';
import { ChartPreview } from './components/ChartPreview';
import { ExampleCharts } from './components/ExampleCharts';
import { TodoList } from './components/TodoList';
import { PasswordGenerator } from './components/PasswordGenerator';
import { CrontabGenerator } from './components/CrontabGenerator';

export function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [parsedOptions, setParsedOptions] = useState<any>(null);
  const [isTodoOpen, setIsTodoOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isCrontabOpen, setIsCrontabOpen] = useState(false);

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    if (!value.trim()) {
      setError(null);
      setParsedOptions(null);
      return;
    }

    try {
      const parsed = JSON.parse(value);
      setError(null);
      setParsedOptions(parsed);
    } catch (e) {
      setError('JSON格式无效');
      setParsedOptions(null);
    }
  };

  const handleExampleSelect = (options: any) => {
    setJsonInput(JSON.stringify(options, null, 2));
    setParsedOptions(options);
    setError(null);
  };

  const closeAllPanels = () => {
    setIsTodoOpen(false);
    setIsPasswordOpen(false);
    setIsCrontabOpen(false);
  };

  const togglePanel = (panel: string) => {
    closeAllPanels();
    switch (panel) {
      case 'todo':
        setIsTodoOpen(true);
        break;
      case 'password':
        setIsPasswordOpen(true);
        break;
      case 'crontab':
        setIsCrontabOpen(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <PieChart className="w-6 h-6 text-green-600" />
                <LineChart className="w-6 h-6 text-yellow-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">JSON to ECharts</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => togglePanel('password')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="密码生成器"
              >
                <KeyRound className="w-6 h-6" />
              </button>
              <button
                onClick={() => togglePanel('crontab')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Crontab 生成器"
              >
                <Calendar className="w-6 h-6" />
              </button>
              <button
                onClick={() => togglePanel('todo')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="待办事项"
              >
                <ListTodo className="w-6 h-6" />
              </button>
              <a
                href="https://github.com/Clint-chan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">选择示例</h2>
          </div>
          <ExampleCharts onSelect={handleExampleSelect} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">JSON输入</h2>
            <JsonEditor
              value={jsonInput}
              onChange={handleJsonChange}
              error={error}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">图表预览</h2>
            {parsedOptions ? (
              <ChartPreview options={parsedOptions} />
            ) : (
              <div className="h-[400px] bg-white rounded-lg shadow-lg p-4 flex items-center justify-center text-gray-500">
                输入有效的JSON数据以预览图表
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            Created by Colin Chen
          </p>
        </div>
      </footer>

      {/* Slide-out Panels */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity ${
          isTodoOpen || isPasswordOpen || isCrontabOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeAllPanels}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isTodoOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <TodoList onClose={() => setIsTodoOpen(false)} />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isPasswordOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <PasswordGenerator onClose={() => setIsPasswordOpen(false)} />
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCrontabOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <CrontabGenerator onClose={() => setIsCrontabOpen(false)} />
      </div>
    </div>
  );
}
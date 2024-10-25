import ReactECharts from 'echarts-for-react';
import { Download, Code, Check } from 'lucide-react';
import { useRef, useState } from 'react';

interface ChartPreviewProps {
  options: any;
}

export function ChartPreview({ options }: ChartPreviewProps) {
  const chartRef = useRef<any>(null);
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const downloadImage = () => {
    if (chartRef.current) {
      const url = chartRef.current.getEchartsInstance().getDataURL();
      const link = document.createElement('a');
      link.download = 'chart.png';
      link.href = url;
      link.click();
      setShowDownloadSuccess(true);
      setTimeout(() => setShowDownloadSuccess(false), 2000);
    }
  };

  const copyCode = async () => {
    const code = `const options = ${JSON.stringify(options, null, 2)};

// 使用 ECharts 初始化图表
const chart = echarts.init(document.getElementById('chart'));
chart.setOption(options);`;

    await navigator.clipboard.writeText(code);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="p-4">
        <ReactECharts 
          ref={chartRef}
          option={options} 
          style={{ height: '400px', width: '100%' }} 
        />
      </div>
      <div className="border-t border-gray-100 p-4 flex justify-end space-x-2">
        <button
          onClick={downloadImage}
          disabled={showDownloadSuccess}
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${
            showDownloadSuccess
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          } border rounded-md transition-all duration-200`}
        >
          {showDownloadSuccess ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              已下载
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-1" />
              导出图片
            </>
          )}
        </button>
        <button
          onClick={copyCode}
          disabled={showCopySuccess}
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${
            showCopySuccess
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
          } border rounded-md transition-all duration-200`}
        >
          {showCopySuccess ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              已复制
            </>
          ) : (
            <>
              <Code className="w-4 h-4 mr-1" />
              复制代码
            </>
          )}
        </button>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { ChartPreview } from './ChartPreview';
import { Code, ChevronDown } from 'lucide-react';

const examples = {
  bar: {
    name: "柱状图示例",
    options: {
      "title": {"text": "2023年中国智能手机出口主要国家", "left": "center"},
      "tooltip": {"show": true},
      "grid": {"left": "1%", "right": "1%", "containLabel": true},
      "xAxis": {"type": "category", "data": ["美国", "中国香港", "日本", "荷兰", "捷克"]},
      "yAxis": {"type": "value"},
      "series": [{
        "type": "bar",
        "data": [
          {"value": 30139843743.85, "itemStyle": {"color": "#5470c6"}},
          {"value": 24939813434.19, "itemStyle": {"color": "#91cc75"}},
          {"value": 6717106717.23, "itemStyle": {"color": "#fac858"}},
          {"value": 4439341425.63, "itemStyle": {"color": "#ee6666"}},
          {"value": 3699772585.79, "itemStyle": {"color": "#73c0de"}}
        ]
      }]
    }
  },
  pie: {
    name: "饼图示例",
    options: {
      "title": {"text": "中国糖类产品出口主要国家", "left": "center"},
      "tooltip": {"formatter": "{b} : {c} ({d}%)"},
      "series": [{
        "type": "pie",
        "center": ["50%", "55%"],
        "radius": ["40%", "65%"],
        "label": {"show": true, "formatter": "{b}：{d}%", "color": "#1D2D3E"},
        "data": [
          {"value": 522067698.65, "name": "巴西", "itemStyle": {"color": "#5470c6"}},
          {"value": 58310431.05, "name": "中国香港", "itemStyle": {"color": "#91cc75"}},
          {"value": 50224671.84, "name": "新西兰", "itemStyle": {"color": "#fac858"}},
          {"value": 84012349.7, "name": "泰国", "itemStyle": {"color": "#ee6666"}}
        ]
      }]
    }
  },
  line: {
    name: "折线图示例",
    options: {
      "animation": true,
      "xAxis": {"data": ["日本", "美国", "英国", "俄罗斯", "比利时"], "type": "category"},
      "yAxis": {"type": "value"},
      "tooltip": {"show": true},
      "grid": {"bottom": 10, "left": 0, "right": 0, "containLabel": true},
      "series": [{
        "type": "line",
        "data": [2047037.3, 1672503.35, 581857.33, 502110.64, 397137.96],
        "areaStyle": {"color": "rgba(255, 199, 46, 0.2)"},
        "lineStyle": {"width": 1.5},
        "itemStyle": {"color": "rgba(255, 199, 46, 1)", "opacity": 0}
      }]
    }
  }
};

export function ExampleCharts({ onSelect }: { onSelect: (options: any) => void }) {
  const [selectedExample, setSelectedExample] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (key: string) => {
    setSelectedExample(key);
    onSelect(examples[key as keyof typeof examples].options);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span>{selectedExample ? examples[selectedExample as keyof typeof examples].name : '选择示例'}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {Object.entries(examples).map(([key, { name }]) => (
            <button
              key={key}
              onClick={() => handleSelect(key)}
              className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
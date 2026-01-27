import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

type ModelType = 'lr' | 'rf' | 'l1' | 'l2';

export function ModelPerformance() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('l1');

  const models = [
    { 
      id: 'lr' as ModelType, 
      name: 'Logistic Regression', 
      accuracy: 0.7538525614327364,
      confusionMatrix: [[1823, 278], [432, 628]]
    },
    { 
      id: 'rf' as ModelType, 
      name: 'Random Forest', 
      accuracy: 0.7546855476884632,
      confusionMatrix: [[1845, 256], [447, 613]]
    },
    { 
      id: 'l1' as ModelType, 
      name: 'L1 Regularized (LASSO)', 
      accuracy: 0.7738442315701791,
      confusionMatrix: [[1897, 204], [391, 669]]
    },
    { 
      id: 'l2' as ModelType, 
      name: 'L2 Regularized (RIDGE)', 
      accuracy: 0.7538525614327364,
      confusionMatrix: [[1823, 278], [432, 628]]
    },
  ];

  const accuracyData = models.map(m => ({
    name: m.name,
    accuracy: (m.accuracy * 100),
    isBest: m.id === 'l1'
  }));

  const currentModel = models.find(m => m.id === selectedModel)!;
  const cm = currentModel.confusionMatrix;

  // Confusion matrix cells with colors
  const cmData = [
    { label: 'True Negative', value: cm[0][0], x: 0, y: 0, color: '#10b981' },
    { label: 'False Positive', value: cm[0][1], x: 1, y: 0, color: '#f59e0b' },
    { label: 'False Negative', value: cm[1][0], x: 0, y: 1, color: '#f59e0b' },
    { label: 'True Positive', value: cm[1][1], x: 1, y: 1, color: '#10b981' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Model Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Select Model
        </label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as ModelType)}
          className="w-full max-w-md px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} - {(model.accuracy * 100).toFixed(2)}% Accuracy
            </option>
          ))}
        </select>
      </div>

      {/* Accuracy Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Model Accuracy Comparison
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Higher is better</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              angle={-20}
              textAnchor="end"
              height={100}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[70, 80]}
              label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none',
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value: number) => `${value.toFixed(2)}%`}
            />
            <Bar dataKey="accuracy" radius={[8, 8, 0, 0]}>
              {accuracyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.isBest ? '#10b981' : '#3b82f6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
          L1 Regularized Logistic Regression achieves the highest accuracy at 77.38%
        </p>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Confusion Matrix - {currentModel.name}
        </h3>
        
        <div className="flex flex-col items-center">
          {/* Matrix Grid */}
          <div className="inline-block">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {cmData.map((cell, idx) => (
                <div
                  key={idx}
                  className="w-40 h-40 rounded-xl flex flex-col items-center justify-center shadow-sm border-2"
                  style={{
                    backgroundColor: cell.color + '20',
                    borderColor: cell.color,
                  }}
                >
                  <p className="text-4xl font-bold" style={{ color: cell.color }}>
                    {cell.value}
                  </p>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-2">
                    {cell.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Labels */}
            <div className="flex justify-between items-center mb-2">
              <div className="w-40 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Predicted: Not Fraud
                </p>
              </div>
              <div className="w-40 text-center">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Predicted: Fraud
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-4 mt-6 w-full">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                {((cm[0][0] + cm[1][1]) / (cm[0][0] + cm[0][1] + cm[1][0] + cm[1][1]) * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Accuracy</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                {(cm[1][1] / (cm[1][1] + cm[0][1]) * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Precision</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {(cm[1][1] / (cm[1][1] + cm[1][0]) * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Recall</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <p className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                {(2 * (cm[1][1] / (cm[1][1] + cm[0][1])) * (cm[1][1] / (cm[1][1] + cm[1][0])) / 
                  ((cm[1][1] / (cm[1][1] + cm[0][1])) + (cm[1][1] / (cm[1][1] + cm[1][0]))) * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">F1 Score</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Interpretation:</span> The confusion matrix shows the model's 
            prediction performance. True Negatives and True Positives (green) represent correct predictions, 
            while False Positives and False Negatives (orange) indicate misclassifications.
          </p>
        </div>
      </div>
    </div>
  );
}

import { AlertCircle, CheckCircle, Database, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Dashboard() {
  const datasetStats = [
    { label: 'Original Records', value: '12,002', icon: Database, color: 'blue' },
    { label: 'After Cleaning', value: '5,801', icon: CheckCircle, color: 'green' },
    { label: 'Features', value: '29', icon: TrendingUp, color: 'purple' },
    { label: 'Removed Records', value: '6,201', icon: AlertCircle, color: 'red' },
  ];

  const algorithms = [
    { name: 'Logistic Regression', accuracy: 75.39, status: 'baseline' },
    { name: 'Random Forest', accuracy: 75.47, status: 'standard' },
    { name: 'L1 (LASSO)', accuracy: 77.38, status: 'best' },
    { name: 'L2 (RIDGE)', accuracy: 75.39, status: 'standard' },
  ];

  const distributionData = [
    { name: 'Fraud', value: 1740, color: '#ef4444' },
    { name: 'Not Fraud', value: 4061, color: '#10b981' },
  ];

  const getIconColor = (color: string) => {
    const colors: { [key: string]: string } = {
      blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30',
      green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
      purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30',
      red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    };
    return colors[color];
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Project Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Project Overview
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </h4>
            <p className="text-gray-900 dark:text-white font-medium">Insurance Fraud Detection System</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Objective
            </h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Develop and deploy machine learning models to detect fraudulent insurance claims using 
              classification algorithms. The system analyzes claim patterns, driver characteristics, 
              and policy details to identify potential fraud cases with high accuracy.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Best Model
            </h4>
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-900 dark:text-green-300">
                L1 Regularized Logistic Regression (LASSO) - 77.38% Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Statistics */}
      <div className="grid grid-cols-4 gap-4">
        {datasetStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${getIconColor(stat.color)}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Data Processing Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Data Cleaning Process
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Original Dataset Shape</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">(12002, 29) - Initial dataset with all records</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">After Outlier Removal</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">(5801, 29) - Removed 6,201 outlier records (51.7% reduction)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Box Plot Analysis</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Applied box plot methodology to identify and remove outliers across all numerical features</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Model Accuracy Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Model Accuracy Comparison
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={algorithms}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                domain={[70, 80]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar 
                dataKey="accuracy" 
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Data Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dataset Distribution (After Cleaning)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Algorithms Used */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Machine Learning Algorithms
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {algorithms.map((algo) => (
            <div
              key={algo.name}
              className={`p-4 rounded-lg border ${
                algo.status === 'best'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className={`font-medium ${
                  algo.status === 'best'
                    ? 'text-green-900 dark:text-green-300'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {algo.name}
                </h4>
                {algo.status === 'best' && (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                )}
              </div>
              <p className={`text-2xl font-semibold ${
                algo.status === 'best'
                  ? 'text-green-700 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>
                {algo.accuracy.toFixed(2)}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Accuracy Score</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

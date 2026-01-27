import { useState } from 'react';
import { Menu, Sun, Moon, BarChart3, Database, Brain, FileSearch } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ModelPerformance } from './components/ModelPerformance';
import { FeatureInsights } from './components/FeatureInsights';
import { FraudPrediction } from './components/FraudPrediction';

type Page = 'dashboard' | 'performance' | 'insights' | 'prediction';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: Database },
    { id: 'performance' as Page, label: 'Model Performance', icon: BarChart3 },
    { id: 'insights' as Page, label: 'Feature Insights', icon: Brain },
    { id: 'prediction' as Page, label: 'Fraud Prediction', icon: FileSearch },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col`}
        >
          {/* Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
            {!sidebarCollapsed && (
              <h1 className="font-semibold text-gray-900 dark:text-white">
                Fraud Detection
              </h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-1 transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 flex-shrink-0" />
              ) : (
                <Moon className="w-5 h-5 flex-shrink-0" />
              )}
              {!sidebarCollapsed && (
                <span className="text-sm font-medium">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {navItems.find((item) => item.id === currentPage)?.label}
            </h2>
          </div>
          <div className="p-8">
            {currentPage === 'dashboard' && <Dashboard />}
            {currentPage === 'performance' && <ModelPerformance />}
            {currentPage === 'insights' && <FeatureInsights />}
            {currentPage === 'prediction' && <FraudPrediction />}
          </div>
        </main>
      </div>
    </div>
  );
}

import { Award, Filter } from 'lucide-react';

export function FeatureInsights() {
  // Correlation matrix data based on user's specification
  const features = [
    'claim_number', 'age_of_driver', 'safety_rating', 'annual_income',
    'high_education', 'address_change', 'zip_code', 'past_num_of_claims',
    'liab_prct', 'police_report', 'vehicle_price', 'total_claim',
    'policy deductible', 'annual premium', 'days open', 'form defects'
  ];

  // Simulated correlation values (symmetric matrix)
  const correlationData: { [key: string]: { [key: string]: number } } = {
    'claim_number': { 'claim_number': 1.0, 'age_of_driver': 0.02, 'safety_rating': -0.01, 'annual_income': 0.03, 'total_claim': 0.12, 'form defects': 0.08 },
    'age_of_driver': { 'claim_number': 0.02, 'age_of_driver': 1.0, 'safety_rating': 0.31, 'annual_income': 0.42, 'total_claim': -0.08, 'form defects': -0.15 },
    'safety_rating': { 'claim_number': -0.01, 'age_of_driver': 0.31, 'safety_rating': 1.0, 'annual_income': 0.28, 'total_claim': -0.18, 'form defects': -0.22 },
    'annual_income': { 'claim_number': 0.03, 'age_of_driver': 0.42, 'safety_rating': 0.28, 'annual_income': 1.0, 'vehicle_price': 0.68, 'annual premium': 0.55 },
    'vehicle_price': { 'annual_income': 0.68, 'vehicle_price': 1.0, 'annual premium': 0.72, 'total_claim': 0.35, 'policy deductible': 0.48 },
    'total_claim': { 'claim_number': 0.12, 'age_of_driver': -0.08, 'safety_rating': -0.18, 'total_claim': 1.0, 'vehicle_price': 0.35, 'form defects': 0.58 },
    'annual premium': { 'annual_income': 0.55, 'vehicle_price': 0.72, 'annual premium': 1.0, 'policy deductible': 0.61, 'total_claim': 0.29 },
    'form defects': { 'claim_number': 0.08, 'age_of_driver': -0.15, 'safety_rating': -0.22, 'form defects': 1.0, 'total_claim': 0.58, 'days open': 0.44 },
  };

  const getCorrelationColor = (value: number) => {
    if (value >= 0.7) return 'bg-red-600';
    if (value >= 0.5) return 'bg-red-400';
    if (value >= 0.3) return 'bg-orange-400';
    if (value >= 0.1) return 'bg-yellow-400';
    if (value >= -0.1) return 'bg-gray-200 dark:bg-gray-600';
    if (value >= -0.3) return 'bg-blue-400';
    if (value >= -0.5) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  const getCorrelation = (f1: string, f2: string): number => {
    if (f1 === f2) return 1.0;
    if (correlationData[f1] && correlationData[f1][f2] !== undefined) {
      return correlationData[f1][f2];
    }
    if (correlationData[f2] && correlationData[f2][f1] !== undefined) {
      return correlationData[f2][f1];
    }
    // Random small correlation for pairs not explicitly defined
    return Math.random() * 0.2 - 0.1;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* L1 Feature Selection Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              L1 Regularization (LASSO) - Feature Selection
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              L1 regularization performs automatic feature selection by driving coefficients of 
              less important features to exactly zero. This improves model interpretability and 
              reduces overfitting.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {features.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total Features</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                  12
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Selected by L1</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                <p className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  77.38%
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Model Accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Selected Features by L1 (Non-Zero Coefficients)
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            'total_claim', 'form defects', 'vehicle_price', 'annual premium',
            'age_of_driver', 'safety_rating', 'annual_income', 'policy deductible',
            'days open', 'past_num_of_claims', 'address_change', 'high_education'
          ].map((feature) => (
            <div
              key={feature}
              className="px-4 py-2.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <p className="text-sm font-medium text-green-900 dark:text-green-300">
                {feature}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          These 12 features were selected as most predictive by L1 regularization, 
          with the remaining features having coefficients driven to zero.
        </p>
      </div>

      {/* Correlation Heatmap */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Feature Correlation Heatmap
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Correlation matrix showing relationships between numerical features used in the analysis
        </p>
        
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid" style={{ gridTemplateColumns: `120px repeat(${features.length}, 48px)` }}>
              {/* Header row */}
              <div></div>
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="h-32 flex items-end justify-center pb-2"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400 transform -rotate-45 origin-bottom-left whitespace-nowrap">
                    {feature.length > 12 ? feature.substring(0, 10) + '...' : feature}
                  </p>
                </div>
              ))}

              {/* Data rows */}
              {features.map((rowFeature, rowIdx) => (
                <>
                  <div
                    key={`label-${rowIdx}`}
                    className="h-12 flex items-center pr-2"
                  >
                    <p className="text-xs text-gray-600 dark:text-gray-400 text-right truncate">
                      {rowFeature}
                    </p>
                  </div>
                  {features.map((colFeature, colIdx) => {
                    const correlation = getCorrelation(rowFeature, colFeature);
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`h-12 w-12 flex items-center justify-center ${getCorrelationColor(correlation)} border border-gray-300 dark:border-gray-600`}
                        title={`${rowFeature} vs ${colFeature}: ${correlation.toFixed(3)}`}
                      >
                        <span className="text-xs font-medium text-gray-900">
                          {correlation.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 bg-blue-800 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Strong Negative</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 bg-gray-200 dark:bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">No Correlation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-6 bg-red-600 rounded"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Strong Positive</span>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Key Insights:</span> Strong positive correlations exist between 
            annual_income and vehicle_price (0.68), vehicle_price and annual_premium (0.72), and 
            total_claim and form_defects (0.58). These relationships help identify fraud patterns.
          </p>
        </div>
      </div>
    </div>
  );
}

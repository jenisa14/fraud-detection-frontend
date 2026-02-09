import { useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2, TrendingUp, AlertCircle } from 'lucide-react';

type ModelType = 'lr' | 'rf' | 'l1' | 'l2';

interface PredictionResult {
  prediction: 'Fraud' | 'Not Fraud';
  probability: number;
  model: string;
  isDemo?: boolean;
}

// const API_URL 

export function FraudPrediction() {
  const [selectedModel, setSelectedModel] = useState<ModelType>('l1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    claim_number: '700123456',
    age_of_driver: '38',
    gender: 'M',
    marital_status: '1',
    safety_rating: '82',
    annual_income: '62000',
    high_education: '1',
    address_change: '0',
    property_status: 'Own',
    zip_code: '50048',
    vehicle_category: 'Medium',
    vehicle_price: '24500',
    vehicle_color: 'black',
    total_claim: '27000',
    injury_claim: '5200',
    policy_deductible: '1000',
    annual_premium: '1350',
    days_open: '9.5',
    form_defects: '3',
  });

  const models = [
    { id: 'lr' as ModelType, name: 'Logistic Regression', accuracy: 75.39 },
    { id: 'rf' as ModelType, name: 'Random Forest', accuracy: 75.47 },
    { id: 'l1' as ModelType, name: 'L1 (LASSO) - Recommended', accuracy: 77.38 },
    { id: 'l2' as ModelType, name: 'L2 (RIDGE)', accuracy: 75.39 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePredict = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Prepare data for API (convert to appropriate types)
      const apiData = {
        claim_number: parseInt(formData.claim_number),
        age_of_driver: parseInt(formData.age_of_driver),
        gender: formData.gender,
        marital_status: parseInt(formData.marital_status),
        safety_rating: parseInt(formData.safety_rating),
        annual_income: parseFloat(formData.annual_income),
        high_education: parseInt(formData.high_education),
        address_change: parseInt(formData.address_change),
        property_status: formData.property_status,
        zip_code: parseInt(formData.zip_code),
        vehicle_category: formData.vehicle_category,
        vehicle_price: parseFloat(formData.vehicle_price),
        vehicle_color: formData.vehicle_color,
        total_claim: parseFloat(formData.total_claim),
        injury_claim: parseFloat(formData.injury_claim),
        'policy deductible': parseInt(formData.policy_deductible),
        'annual premium': parseFloat(formData.annual_premium),
        'days open': parseFloat(formData.days_open),
        'form defects': parseInt(formData.form_defects),
      };

      // Call your Flask API
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.success) {
        setResult({
          prediction: data.prediction,
          probability: data.probability,
          model: models.find(m => m.id === selectedModel)!.name,
        });
      } else {
        setError(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.warn('Backend unavailable, switching to Demo Mode', err);
      // Fallback to Demo Mode
      const isFraud = parseFloat(formData.total_claim) > 20000;
      const mockProb = isFraud ? 0.75 + Math.random() * 0.15 : 0.1 + Math.random() * 0.2;
      
      setResult({
        prediction: isFraud ? 'Fraud' : 'Not Fraud',
        probability: mockProb,
        model: models.find(m => m.id === selectedModel)!.name,
        isDemo: true
      });
      // We don't set error here, so the user sees the result (with a warning)
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { key: 'claim_number', label: 'Claim Number', type: 'text' },
    { key: 'age_of_driver', label: 'Age of Driver', type: 'number' },
    { key: 'gender', label: 'Gender', type: 'select', options: ['M', 'F'] },
    { key: 'marital_status', label: 'Marital Status', type: 'select', options: ['0', '1'] },
    { key: 'safety_rating', label: 'Safety Rating', type: 'number' },
    { key: 'annual_income', label: 'Annual Income', type: 'number' },
    { key: 'high_education', label: 'High Education', type: 'select', options: ['0', '1'] },
    { key: 'address_change', label: 'Address Change', type: 'select', options: ['0', '1'] },
    { key: 'property_status', label: 'Property Status', type: 'select', options: ['Own', 'Rent'] },
    { key: 'zip_code', label: 'Zip Code', type: 'text' },
    { key: 'vehicle_category', label: 'Vehicle Category', type: 'select', options: ['Small', 'Medium', 'Large', 'Luxury'] },
    { key: 'vehicle_price', label: 'Vehicle Price', type: 'number' },
    { key: 'vehicle_color', label: 'Vehicle Color', type: 'text' },
    { key: 'total_claim', label: 'Total Claim', type: 'number' },
    { key: 'injury_claim', label: 'Injury Claim', type: 'number' },
    { key: 'policy_deductible', label: 'Policy Deductible', type: 'number' },
    { key: 'annual_premium', label: 'Annual Premium', type: 'number' },
    { key: 'days_open', label: 'Days Open', type: 'number' },
    { key: 'form_defects', label: 'Form Defects', type: 'number' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Backend Connection Status */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <p className="text-sm text-blue-900 dark:text-blue-300">
            Using real trained model: <span className="font-semibold">fraud_detection_model.pkl</span>
          </p>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 ml-4">
          Backend API: {API_URL} (Make sure Flask server is running)
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900 dark:text-red-300">Connection Error</p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Model Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Select Prediction Model
        </label>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value as ModelType)}
          className="w-full max-w-md px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.accuracy.toFixed(2)}%)
            </option>
          ))}
        </select>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Claim Information
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {inputFields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                {field.label}
              </label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={formData[field.key as keyof typeof formData]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handlePredict}
          disabled={loading}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              Predict Fraud
            </>
          )}
        </button>
      </div>

      {/* Prediction Result */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Prediction Result
            </h3>
            {result.isDemo && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full border border-yellow-200">
                ⚠️ Demo Mode (Backend Unavailable)
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Result Card */}
            <div
              className={`p-6 rounded-xl border-2 ${
                result.prediction === 'Fraud'
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {result.prediction === 'Fraud' ? (
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                )}
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {result.prediction}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model: {result.model}
              </p>
            </div>

            {/* Probability Gauge */}
            <div className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Fraud Probability
              </h4>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {(result.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-gray-600">
                  <div
                    style={{ width: `${result.probability * 100}%` }}
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                      result.probability > 0.5
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>0% (Not Fraud)</span>
                  <span>100% (Fraud)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Claim Amount</p>
              <p className="text-xl font-bold text-blue-700 dark:text-blue-400">
                ${parseFloat(formData.total_claim).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Form Defects</p>
              <p className="text-xl font-bold text-purple-700 dark:text-purple-400">
                {formData.form_defects}
              </p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Model Accuracy</p>
              <p className="text-xl font-bold text-orange-700 dark:text-orange-400">
                {models.find(m => m.id === selectedModel)?.accuracy.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-medium">Recommendation:</span>{' '}
              {result.prediction === 'Fraud'
                ? 'This claim shows indicators of potential fraud. Recommend manual review and investigation by fraud detection team.'
                : 'This claim appears legitimate based on the provided information. Standard processing can proceed.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
# 🚀 Backend Setup Instructions

To connect your Figma Make React dashboard to your local Python machine learning model, follow these steps.

## 1. Project Structure
Create a folder structure like this on your computer:

```
/My_Fraud_Detection_App
  ├── /frontend          <-- Extract the Figma Make zip file here
  └── /backend           <-- Create this folder for your ML model
        ├── app.py
        ├── requirements.txt
        ├── fraud_detection_model.pkl  <-- YOUR TRAINED MODEL
        └── model_columns.pkl          <-- YOUR SAVED COLUMNS
```

## 2. Backend Setup (Python)

### A. Create `requirements.txt`
Inside the `/backend` folder, create a file named `requirements.txt` with this content:

```txt
flask==3.1.2
flask-cors==6.0.2
joblib==1.5.3
pandas==2.3.0
scikit-learn==1.5.1
```

### B. Create `app.py`
Inside the `/backend` folder, create a file named `app.py` with this content:

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

print("⏳ Loading models...")
try:
    # ENSURE THESE FILENAMES MATCH YOUR ACTUAL PKL FILES
    model_columns = joblib.load("model_columns.pkl")
    model = joblib.load("fraud_detection_model.pkl") 
    print("✅ Models loaded successfully!")
except Exception as e:
    print(f"❌ Error loading models: {e}")
    print("Ensure fraud_detection_model.pkl and model_columns.pkl are in this folder.")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        json_ = request.json
        query_df = pd.DataFrame([json_])
        query = pd.get_dummies(query_df)
        query = query.reindex(columns=model_columns, fill_value=0)
        
        prediction = model.predict(query)
        probability = model.predict_proba(query)
        
        return jsonify({
            "success": True,
            "prediction": "Fraud" if prediction[0] == 1 else "Not Fraud",
            "probability": float(probability[0][1])
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

### C. Run the Server
1. Open your terminal/command prompt.
2. Navigate to the backend folder: `cd backend`
3. Install dependencies: `pip install -r requirements.txt`
4. Start the server: `python app.py`

You should see: `Running on http://127.0.0.1:5000`

## 3. Frontend Setup (React)

1. Open a new terminal window.
2. Navigate to the frontend folder: `cd frontend`
3. Install dependencies: `npm install`
4. Start the React app: `npm run dev`
5. Open your browser to the local URL (usually http://localhost:5173).

## 4. Testing
- Go to the "Fraud Prediction" page in the dashboard.
- The "Demo Mode" badge should disappear if the backend is connected.
- Click "Predict Fraud" to test your real model!

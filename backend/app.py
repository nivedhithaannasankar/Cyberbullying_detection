from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import re
import json

app = Flask(__name__)
CORS(app)

# -------------------------
# LOAD MODEL
# -------------------------
MODEL_PATH = "model/model.pkl"
VECTORIZER_PATH = "model/vectorizer.pkl"

if not os.path.exists(MODEL_PATH) or not os.path.exists(VECTORIZER_PATH):
    raise FileNotFoundError("Model files not found. Train your model first.")

model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# -------------------------
# MEMORY STORAGE (PERSISTENT)
# -------------------------
DATA_FILE = "history.json"

if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r") as f:
        history = json.load(f)
else:
    history = []

# -------------------------
# CLEAN TEXT
# -------------------------
def clean_text(text):
    text = str(text).lower()
    text = re.sub(r"http\S+|www\S+", "", text)
    text = re.sub(r"[^a-zA-Z\s]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text

# -------------------------
# HOME ROUTE
# -------------------------
@app.route("/")
def home():
    return "Cyberbullying Detection API is Running"

# -------------------------
# PREDICT ROUTE
# -------------------------

@app.route("/stats", methods=["GET"])
def stats():
    total = len(history)
    bullying = sum(1 for item in history if item["prediction"] == "Cyberbullying")
    safe = sum(1 for item in history if item["prediction"] == "Not Cyberbullying")

    return jsonify({
        "total": total,
        "bullying": bullying,
        "safe": safe
    })
    
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    if not data or "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data["text"]
    cleaned = clean_text(text)

    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]

    result = "Cyberbullying" if prediction == 1 else "Not Cyberbullying"

    # -------------------------
    # STORE RESULT
    # -------------------------
    history.append({
        "text": text,
        "prediction": result
    })

    with open(DATA_FILE, "w") as f:
        json.dump(history, f)

    # -------------------------
    # RESPONSE
    # -------------------------
    return jsonify({
        "input": text,
        "prediction": result
    })

# -------------------------
# HISTORY API
# -------------------------
@app.route("/history", methods=["GET"])
def get_history():
    return jsonify(history)

# -------------------------
# RUN SERVER
# -------------------------
if __name__ == "__main__":
    app.run(debug=True)
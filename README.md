
# 🚀 Cyberbullying Detection System

## 📌 Overview

A Machine Learning + NLP web app that detects and classifies cyberbullying content from text inputs in real time.

---

## ⚙️ Tech Stack

* **Frontend:** React.js
* **Backend:** Flask (Python REST API)
* **ML Model:** TF-IDF + Logistic Regression
* **Libraries:** Scikit-learn, Pandas, NumPy

---

## ✨ Features

* Real-time cyberbullying detection
* Multi-class classification (age, gender, religion, ethnicity, etc.)
* NLP-based text preprocessing
* REST API integration
* Simple and responsive UI

---

## 🏗️ Architecture

User → React Frontend → Flask API → NLP Processing → ML Model → Prediction

---

## 📊 Dataset

* Source: Kaggle
* ~20,000+ labeled comments
* Classes: age, gender, religion, ethnicity, other, not_cyberbullying

---

## 🧠 Workflow

Data → Cleaning → Preprocessing → TF-IDF → Training → Evaluation → Deployment

---

## 💻 Run Project

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
python app.py
```

---

## 🔌 API

**POST /predict**

```json
{
  "text": "You are useless and stupid"
}
```

**Response**

```json
{
  "prediction": "General Cyberbullying",
  "confidence": 87.5
}
```

---

## 🚀 Future Scope

* Deep Learning (BERT/LSTM)
* Multi-language support
* Dashboard & analytics
* Mobile app

---

## ⭐ Goal

Detect and reduce cyberbullying using AI-powered text classification.

---

Just tell 👍

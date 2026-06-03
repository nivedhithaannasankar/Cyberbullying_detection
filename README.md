
# 🚀 Cyberbullying Detection System

## 📌 Overview

The **Cyberbullying Detection System** is a Machine Learning and Natural Language Processing (NLP) based web application that detects and classifies cyberbullying content from user-provided text.

It helps identify harmful, offensive, and abusive language in online communication, contributing to a safer digital environment.

The system consists of:

* 🖥️ Frontend: React.js
* ⚙️ Backend: Flask (Python REST API)
* 🤖 Machine Learning Model: NLP-based classifier (TF-IDF + Logistic Regression)
* 📊 Dataset: Cyberbullying labeled text dataset

---

## ❗ Problem Statement

Cyberbullying is a major issue across social media platforms and online communities.

Manual moderation is:

* time-consuming
* error-prone
* not scalable

This project automates detection of cyberbullying content using Machine Learning and provides real-time predictions through a web interface.

---

## ✨ Features

* ⚡ Real-time cyberbullying detection
* 🧠 NLP-based text preprocessing
* 📊 Multi-class classification (age, gender, religion, ethnicity, etc.)
* 🌐 REST API integration (Flask backend)
* 🎨 User-friendly React frontend
* 📱 Responsive UI
* 🚀 Fast prediction response

---

## 🛠️ Technology Stack

### 🎨 Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router DOM

### ⚙️ Backend

* Python
* Flask
* Flask-CORS

### 🤖 Machine Learning

* Scikit-learn
* Pandas
* NumPy

### 🧰 Tools

* VS Code
* Git
* GitHub

---

## 🏗️ Project Architecture

```text
User Input
   ↓
React Frontend
   ↓
Flask REST API
   ↓
Text Preprocessing (NLP)
   ↓
TF-IDF Vectorization
   ↓
Trained ML Model
   ↓
Prediction Output
```

---

## 📊 Dataset

The dataset contains labeled social media comments for cyberbullying detection.

### Labels include:

* age
* gender
* religion
* ethnicity
* other_cyberbullying
* not_cyberbullying

### Dataset Details:

* Source: Kaggle
* Records: ~20,000+
* Format: CSV

---

## 🧠 Machine Learning Workflow

1. Data Collection
2. Data Cleaning
3. Text Preprocessing
4. Label Normalization
5. Feature Extraction (TF-IDF)
6. Train-Test Split
7. Model Training (Logistic Regression)
8. Model Evaluation
9. Model Deployment via Flask API

---

## 💻 Frontend Setup

### Navigate to frontend

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Start frontend

```bash
npm start
```

Frontend runs at:

```text
http://localhost:3000
```

---

## ⚙️ Backend Setup

### Navigate to backend

```bash
cd backend
```

### Create virtual environment

```bash
python -m venv venv
```

### Activate environment

Windows:

```bash
venv\Scripts\activate
```

Linux/Mac:

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Run Flask server

```bash
python app.py
```

Backend runs at:

```text
http://localhost:5000
```

---

## 🔌 API Endpoint

### Predict Cyberbullying

**POST**

```text
/predict
```

### Request

```json
{
  "text": "You are useless and stupid"
}
```

### Response

```json
{
  "input": "You are useless and stupid",
  "prediction": "General Cyberbullying",
  "confidence": 87.5
}
```

---

## 🚀 Future Enhancements

* 🌍 Multi-language support
* 🧠 Deep Learning (BERT / LSTM)
* 🔐 User authentication system
* 📊 Analytics dashboard
* 💬 Social media integration
* 📱 Mobile application

---


## ⭐ Project Goal

To build an intelligent system that helps detect and reduce cyberbullying in online communication using AI.

---


import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

from utils.preprocess import clean_text

# -------------------------
# CREATE MODEL FOLDER
# -------------------------
os.makedirs("model", exist_ok=True)

# -------------------------
# LOAD DATASET
# -------------------------
df = pd.read_csv("train/dataset.csv")

# -------------------------
# CLEAN TEXT
# -------------------------
df["text"] = df["text"].astype(str).apply(clean_text)

X = df["text"]
y = df["label"]

# -------------------------
# SPLIT DATA
# -------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3)

# -------------------------
# TF-IDF VECTORIZATION
# -------------------------
vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# -------------------------
# MODEL TRAINING
# -------------------------
model = LogisticRegression(max_iter=1000)
model.fit(X_train_vec, y_train)

# -------------------------
# SAVE MODEL
# -------------------------
joblib.dump(model, "model/model.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

print("✅ Model trained and saved successfully!")


y_pred = model.predict(X_test_vec)

print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
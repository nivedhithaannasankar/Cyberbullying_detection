import os
import re
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# ----------------------------------
# CREATE MODEL DIRECTORY
# ----------------------------------
os.makedirs("model", exist_ok=True)

# ----------------------------------
# TEXT CLEANING
# ----------------------------------
def clean_text(text):
    text = str(text).lower()

    # remove urls
    text = re.sub(r"http\S+|www\S+", "", text)

    # keep only letters
    text = re.sub(r"[^a-zA-Z\s]", "", text)

    # normalize spaces
    text = re.sub(r"\s+", " ", text).strip()

    return text

# ----------------------------------
# LOAD DATASET
# ----------------------------------
df = pd.read_csv("train/cyberbullying_tweets.csv")

print("Dataset Shape:", df.shape)

# ----------------------------------
# CLEAN LABELS
# ----------------------------------
df["cyberbullying_type"] = (
    df["cyberbullying_type"]
    .astype(str)
    .str.lower()
    .str.strip()
)

df["cyberbullying_type"] = df["cyberbullying_type"].replace({
    "not cyberbullying": "not_cyberbullying",
    "cyberbulling": "other_cyberbullying"
})

# ----------------------------------
# CLEAN TEXT
# ----------------------------------
df["tweet_text"] = df["tweet_text"].astype(str).apply(clean_text)
df = df[df["tweet_text"].str.strip() != ""]


generic_insults = r"\b(idiot|stupid|dumb|fool|moron|useless|nonsense|retard)\b"

df.loc[
    df["tweet_text"].str.contains(generic_insults, case=False, na=False),
    "cyberbullying_type"
] = "other_cyberbullying"

# ----------------------------------
#  BALANCE CLASSES (VERY IMPORTANT)
# ----------------------------------
min_count = df["cyberbullying_type"].value_counts().min()

df = df.groupby("cyberbullying_type").sample(n=min_count, random_state=42)

print("\nBalanced Class Distribution:\n")
print(df["cyberbullying_type"].value_counts())

# ----------------------------------
# FEATURES & LABELS
# ----------------------------------
X = df["tweet_text"]
y = df["cyberbullying_type"]

# ----------------------------------
# TRAIN TEST SPLIT
# ----------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print("\nTraining Samples:", len(X_train))
print("Testing Samples :", len(X_test))

# ----------------------------------
# TF-IDF (IMPROVED FOR PHRASES)
# ----------------------------------
vectorizer = TfidfVectorizer(
    max_features=100000,
    ngram_range=(1, 3),   # CRITICAL FIX
    min_df=1,
    sublinear_tf=True,
    stop_words="english"
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

print("\nVectorization Complete")

# ----------------------------------
# MODEL (STABLE CONFIG)
# ----------------------------------
model = LogisticRegression(
    max_iter=8000,
    solver="saga",
    C=1.0,
    class_weight="balanced",
    random_state=42
)

print("\nTraining Model...")
model.fit(X_train_vec, y_train)

# ----------------------------------
# SAVE MODEL
# ----------------------------------
joblib.dump(model, "model/model.pkl")
joblib.dump(vectorizer, "model/vectorizer.pkl")

print("\nModel Saved Successfully")

# ----------------------------------
# EVALUATION
# ----------------------------------
y_pred = model.predict(X_test_vec)

print("\nAccuracy:", accuracy_score(y_test, y_pred))

print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:\n")
print(confusion_matrix(y_test, y_pred))

print("\nDetected Classes:")
print(model.classes_)

# ----------------------------------
# TESTING
# ----------------------------------
test_sentences = [
    "Girls cannot code",
    "You are too old to understand",
    "Go back to retirement old man",
    "People from your ethnic group are useless",
    "Your community is worthless",
    "Your religion is stupid",
    "You are an idiot",
    "Have a nice day"
]

print("\nSample Predictions:\n")

for text in test_sentences:
    cleaned = clean_text(text)
    vec = vectorizer.transform([cleaned])

    prediction = model.predict(vec)[0]
    confidence = max(model.predict_proba(vec)[0]) * 100

    print(f"Text       : {text}")
    print(f"Prediction : {prediction}")
    print(f"Confidence : {confidence:.2f}%")
    print("-" * 60)
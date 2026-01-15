# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
import tensorflow as tf
import pandas as pd
import numpy as np
import joblib
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

logging.basicConfig(
    filename="predict.log",
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

model = tf.keras.models.load_model("models/cyber_dnn_model.keras")
preprocessor = joblib.load("models/cyber_preprocessor.joblib")

# Kolom input (harus urut sesuai training)
EXPECTED_COLS = [
    "Packet_Length",
    "Duration",
    "Source_Port",
    "Destination_Port",
    "Bytes_Sent",
    "Bytes_Received",
    "Flow_Packets",
    "Total_Fwd_Packets",
    "Total_Bwd_Packets",
    "Sub_Flow_Fwd_Bytes",
    "Sub_Flow_Bwd_Bytes",
    "Attack_Type",
]

NUMERIC_COLS = [
    "Packet_Length",
    "Duration",
    "Source_Port",
    "Destination_Port",
    "Bytes_Sent",
    "Bytes_Received",
    "Flow_Packets",
    "Total_Fwd_Packets",
    "Total_Bwd_Packets",
    "Sub_Flow_Fwd_Bytes",
    "Sub_Flow_Bwd_Bytes",
]

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        logging.info(f"Received data: {data}")

        print("\n===== 🟦 RAW INPUT JSON FROM FRONTEND =====")
        print(data)

        # Buat DataFrame
        df = pd.DataFrame([data])

        # Pastikan semua kolom ada
        for col in EXPECTED_COLS:
            if col not in df.columns:
                df[col] = np.nan

        df = df[EXPECTED_COLS]

        # Konversi numeric
        df[NUMERIC_COLS] = df[NUMERIC_COLS].apply(pd.to_numeric, errors="coerce")

        df.replace([np.inf, -np.inf], np.nan, inplace=True)
        df.fillna(0, inplace=True)

        print("\n===== 🟩 CLEANED DATAFRAME (READY FOR PREPROCESSOR) =====")
        print(df)

        # Preprocess
        X = preprocessor.transform(df)

        # Prediksi raw
        raw_pred = model.predict(X)

        print("\n===== 🟨 RAW MODEL PREDICTION OUTPUT =====")
        print(raw_pred)
        logging.info(f"Raw model output: {raw_pred.tolist()}")

        # Jika model 1 output sigmoid → ambil 0
        prob = float(raw_pred.flatten()[0])

        # Fix NaN, inf
        if prob is None or np.isnan(prob) or np.isinf(prob):
            prob = 0.0

        # Clamp
        prob = max(0.0, min(prob, 1.0))

        # Tentukan label
        label = "Normal" if prob < 0.25 else "Attack"

        print("\n===== 🟧 FINAL RESULT =====")
        print("Prediction Label :", label)
        print("Probability      :", prob)
        print("Probability (%)  :", prob * 100)

        # Log
        logging.info(f"Prediction: {label}, probability={prob}")

        return jsonify({
            "prediction": label,
            "probability": float(prob)
        }), 200

    except Exception as e:
        logging.error(f"ERROR: {e}")
        print("\n===== 🔴 ERROR =====")
        print(e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

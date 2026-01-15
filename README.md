# 🚨 Cyber Attack Predictor (Cyber Threat Detection System)

Cyber Attack Predictor adalah aplikasi berbasis **Machine Learning dan Web** yang digunakan untuk **mendeteksi potensi serangan siber** berdasarkan karakteristik lalu lintas jaringan (network traffic features).  
Sistem ini mengintegrasikan **Deep Feedforward Neural Network (DNN / MLP)** sebagai model klasifikasi dan **aplikasi web interaktif** sebagai antarmuka pengguna.

---

## 📌 Fitur Utama
- 🔍 Deteksi serangan siber (Normal vs Attack)
- 🧠 Model Deep Neural Network (DNN / MLP)
- ⚙️ Feature engineering pada data jaringan
- 🌐 REST API menggunakan Flask
- 💻 Frontend interaktif menggunakan React + Tailwind CSS
- 📊 Menampilkan hasil prediksi dan probabilitas serangan

---

## 🧠 Arsitektur Sistem
User (Browser)
↓
React Frontend (Vite + Tailwind)
↓
Flask REST API
↓
DNN / MLP Model (TensorFlow / Keras)

---

## 🗂 Dataset & Fitur
Dataset berisi data lalu lintas jaringan dengan fitur-fitur seperti:
- Packet Length
- Duration
- Source Port & Destination Port
- Bytes Sent & Bytes Received
- Flow Packets/s
- Total Forward & Backward Packets
- Sub Flow Forward & Backward Bytes
- Attack Type (Label)

**Feature Engineering yang diterapkan:**
- Ekstraksi waktu dari timestamp (hour, day, weekend)
- Pengelompokan port (System / Registered / Dynamic)
- Normalisasi fitur numerik
- One-Hot Encoding untuk fitur kategorikal

---

## ⚙️ Teknologi yang Digunakan
### Backend & Machine Learning
- Python
- Flask
- TensorFlow & Keras
- Scikit-learn
- Pandas & NumPy

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

---

## 🚀 Cara Menjalankan Proyek

### 1. Backend (Flask API)
```bash
pip install -r requirements.txt
python app.py

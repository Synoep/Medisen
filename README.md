# Medisen

Medisen is a web application that predicts the top 5 possible diseases based on the symptoms entered by the user. It utilizes a Random Forest Classifier for prediction and provides relevant symptoms associated with each predicted disease.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Backend Structure](#backend-structure)
- [Frontend Structure](#frontend-structure)
- [Disclaimer](#disclaimer)
- [License](#license)

## Project Overview
Medisen is designed to assist users by suggesting potential health conditions based on provided symptoms. This tool is not a replacement for professional medical advice and is intended for informational purposes only.

## Features
- Predicts top 5 possible diseases based on user-provided symptoms.
- Displays matching and relevant symptoms for each disease.
- Responsive design for desktop and mobile views.
- Provides a disclaimer to inform users of its intended use.

## Tech Stack
- **Frontend:** React, CSS, Axios
- **Backend:** Flask, Pandas, Scikit-learn, Random Forest Classifier
- **Others:** Flask-CORS for Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Node.js and npm for frontend
- Python 3.8+ for backend
- Flask, Pandas, Scikit-learn, Flask-CORS libraries
# Project Setup Guide

## Backend Setup

### 1. Clone the Repository
```bash
git clone https://github.com/username/medisen.git
cd medisen/backend
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Place Dataset in Backend Folder
- Ensure your dataset file is named `dis_sym_dataset_comb.csv` and place it in the `backend` folder.

### 4. Run the Flask Server
```bash
python server.py
```
- The backend server should now be running on [http://localhost:5000](http://localhost:5000).

---

## Frontend Setup

### 1. Navigate to the Frontend Directory
```bash
cd ../frontend
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Start the React Development Server
```bash
npm run dev
```
---

## Screenshots
![image](https://github.com/user-attachments/assets/a2d304a8-a2d2-413e-b254-4cabc94cf5ee)

<br> <br>

![image](https://github.com/user-attachments/assets/b9722ee6-4eca-4b19-92e8-277dbcd50fd7)

<br> <br>

![image](https://github.com/user-attachments/assets/5ac6ac35-a80f-49b6-8bd0-8ee7d4ecba7f)

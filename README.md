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

## Backend Setup

### Clone the repository
git clone https://github.com/username/medisen.git
cd medisen/backend

### Install Python dependencies
pip install -r requirements.txt

### Place your dataset in the backend folder'

### Run the Flask server
python app.py

### The backend server should now be running on http://localhost:5000

## Frontend Setup

### Navigate to the frontend directory
cd ../frontend

### Install frontend dependencies
npm install

### Start the React development server
npm start

### The frontend should now be running on http://localhost:3000

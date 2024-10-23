from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from decimal import Decimal

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

try:
    df_comb = pd.read_csv("dis_sym_dataset_comb.csv")
    X = df_comb.iloc[:, 1:]
    Y = df_comb.iloc[:, 0]

    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.20, random_state=42)

    random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
    random_forest.fit(x_train, y_train)

    rf_pred = random_forest.predict(x_test)
    acc_rf = round(Decimal(accuracy_score(y_test, rf_pred) * 100), 2)
    print(f"Accuracy of Random Forest model: {acc_rf}%")

except Exception as e:
    print(f"Error loading data or training model: {e}")
    exit(1)

def give_symptoms(disease):
    try:
        matching_rows = df_comb[df_comb.iloc[:, 0] == disease]
        
        if matching_rows.empty:
            print(f"No data found for disease: {disease}")
            return []
        
        all_symptoms = []
        
        for _, row in matching_rows.iterrows():
            symptoms = row[1:][row[1:] == 1].index.tolist()
            all_symptoms.extend(symptoms)
        
        all_symptoms = list(set(all_symptoms))
        
        print(all_symptoms)
        return all_symptoms
    except Exception as e:
        print(f"Error in give_symptoms: {e}")
        return []

def predict_top_5_diseases(symptoms):
    try:
        symptoms_dict = {symptom: 0.0 for symptom in X.columns}
        
        for symptom in symptoms:
            if symptom in symptoms_dict:
                symptoms_dict[symptom] = 1.0
        
        input_data = pd.DataFrame([symptoms_dict])
        
        probabilities = random_forest.predict_proba(input_data)
        top_indices = probabilities.argsort()[0][-5:][::-1]
        top_diseases = [random_forest.classes_[i] for i in top_indices]

        return top_diseases
    except Exception as e:
        print(f"Error in predict_top_5_diseases: {e}")
        return []

@app.route('/', methods=['POST'])
def index():
    try:
        data_json = request.get_json()
        symptoms = data_json.get("list", [])
        print("Received symptoms:", symptoms)

        if not symptoms:
            print("Error: Symptoms list cannot be empty.")
            return jsonify({"error": "Symptoms list cannot be empty."}), 400
        
        top_5_predictions = predict_top_5_diseases(symptoms)

        if not top_5_predictions:
            print("No prediction made.")
            return jsonify({"error": "No prediction could be made."}), 500

        json_dict_list = []
        for predi in top_5_predictions:
            all_symptoms = give_symptoms(predi)
            print(f"Predicted Disease: {predi}, Symptoms: {all_symptoms}")
            matched_symptoms = [symptom for symptom in symptoms if symptom in all_symptoms]
            json_dict = {
                "disease": predi,
                "all_symptoms": all_symptoms,
                "matched_symptoms": matched_symptoms
            }
            json_dict_list.append(json_dict)

        return jsonify(json_dict_list)
    except Exception as e:
        print("Error in processing:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

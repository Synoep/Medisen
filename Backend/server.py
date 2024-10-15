from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from decimal import Decimal

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load data and train the Random Forest model
try:
    df_comb = pd.read_csv("dis_sym_dataset_comb.csv")
    X = df_comb.iloc[:, 1:]  # Features (symptoms)
    Y = df_comb.iloc[:, 0]   # Labels (diseases)

    # Split the data into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(X, Y, test_size=0.10, random_state=42)

    # Train Random Forest model
    random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
    random_forest.fit(x_train, y_train)

    # Calculate accuracy of the Random Forest model on the test set
    rf_pred = random_forest.predict(x_test)
    acc_rf = round(Decimal(accuracy_score(y_test, rf_pred) * 100), 2)
    print(f"Accuracy of Random Forest model: {acc_rf}%")

except Exception as e:
    print(f"Error loading data or training model: {e}")
    exit(1)

def predict_disease(symptoms):
    try:
        # Initialize a dictionary for symptoms with all values set to 0
        symptoms_dict = {symptom: 0.0 for symptom in X.columns}
        
        # Set the input symptoms to 1 if they are in the symptoms list
        for symptom in symptoms:
            if symptom in symptoms_dict:
                symptoms_dict[symptom] = 1.0
        
        # Convert the symptom dictionary to a DataFrame (single input row)
        input_data = pd.DataFrame([symptoms_dict])
        
        # Predict disease using Random Forest model
        prediction = random_forest.predict(input_data)
        return prediction.tolist()
    except Exception as e:
        print(f"Error in predict_disease: {e}")
        return []

def give_symptoms(disease):
    try:
        # Fetch the row corresponding to the predicted disease
        matching_rows = df_comb[df_comb.iloc[:, 0] == disease]
        
        if matching_rows.empty:
            print(f"No data found for disease: {disease}")
            return [], []  # Return empty lists if no disease is found
        
        # Extract the symptoms for the given disease
        all_symptoms = matching_rows.iloc[0, 1:].index[matching_rows.iloc[0, 1:] == 1].tolist()
        
        print(all_symptoms)  # Log the symptoms associated with the disease
        return all_symptoms
    except Exception as e:
        print(f"Error in give_symptoms: {e}")
        return [], []

def predict_top_5_diseases(symptoms):
    try:
        # Initialize a dictionary for symptoms with all values set to 0
        symptoms_dict = {symptom: 0.0 for symptom in X.columns}
        
        # Set the input symptoms to 1 if they are in the symptoms list
        for symptom in symptoms:
            if symptom in symptoms_dict:
                symptoms_dict[symptom] = 1.0
        
        # Convert the symptom dictionary to a DataFrame (single input row)
        input_data = pd.DataFrame([symptoms_dict])
        
        # Get the top 5 predictions from the Random Forest model
        probabilities = random_forest.predict_proba(input_data)  # Get probabilities for all classes
        top_indices = probabilities.argsort()[0][-5:][::-1]  # Get indices of the top 5 predictions
        top_diseases = [random_forest.classes_[i] for i in top_indices]  # Get disease names

        return top_diseases  # Return the top 5 predicted diseases
    except Exception as e:
        print(f"Error in predict_top_5_diseases: {e}")
        return []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            data_json = request.get_json()
            symptoms = data_json.get("list", [])
            print("Received symptoms:", symptoms)  # Log input

            if not isinstance(symptoms, list):
                print("Error: Invalid input format.")
                return jsonify({"error": "Invalid input format. 'list' should be an array of symptoms."}), 400
            
            if not symptoms:
                print("Error: Symptoms list cannot be empty.")
                return jsonify({"error": "Symptoms list cannot be empty."}), 400
            
            # Get top 5 predicted diseases
            top_5_predictions = predict_top_5_diseases(symptoms)

            if not top_5_predictions:
                print("No prediction made.")
                return jsonify({"error": "No prediction could be made."}), 500

            json_dict_list = []
            for predi in top_5_predictions:
                # Get all symptoms related to the predicted disease
                all_symptoms = give_symptoms(predi)
                
                # Log the predicted disease and its associated symptoms
                print(f"Predicted Disease: {predi}, Symptoms: {all_symptoms}")
                
                # Determine which symptoms matched the input
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

    return '''
        <form method="post" action="/">
            <label for="symptoms">Symptoms (comma-separated):</label>
            <input type="text" name="symptoms" id="symptoms">
            <input type="submit" value="Submit">
        </form>
    '''

if __name__ == "__main__":
    app.run(debug=True)

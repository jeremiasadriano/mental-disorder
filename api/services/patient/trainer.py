# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegression
# from sklearn.preprocessing import OneHotEncoder
# import pandas as pd
# import os 
# import joblib 
# from flask import Blueprint, request, jsonify
# from models import db, User

# patientBluePrint = Blueprint('patient', __name__)

# @patientBluePrint.post('/predict')
# def previsao():
#     current_dir = os.path.dirname(os.path.abspath(__file__))
#     train_path = os.path.join(current_dir, '../datasets/Dataset-Mental-Disorders.csv')
#     df = pd.read_csv(train_path)

#     df = df.drop('Patient Number', axis=1)

#     df['Expert Diagnose'] = df['Expert Diagnose'].map({'Normal': 0, 
#                                                     'Bipolar Type-1': 1,
#                                                     'Bipolar Type-2': 2,
#                                                     'Depression': 3}).astype(int)


#     X = df.drop(columns=['Expert Diagnose'],axis=1)
#     y = df['Expert Diagnose']
    

#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


#     data = request.get_json()

#     patient_data = {
#         'sadness': data['Sadness'],
#         'euphoric': data['Euphoric'],
#         'exhausted': data['Exhausted'],
#         'sleep_disorder': data['Sleep dissorder'],
#         'mood_swing': data['Mood Swing'],
#         'suicidal_thoughts': data['Suicidal thoughts'],
#         'anorexia': data['Anorxia'],
#         'authority_respect': data['Authority Respect'],
#         'try_explanation': data['Try-Explanation'],
#         'aggressive_response': data['Aggressive Response'],
#         'ignore_move_on': data['Ignore & Move-On'],
#         'nervous_breakdown': data['Nervous Break-down'],
#         'admit_mistakes': data['Admit Mistakes'],
#         'overthinking': data['Overthinking'],
#         'sexual_activity': data['Sexual Activity'],
#         'concentration': data['Concentration'],
#         'optimism': data['Optimisim']
#     }
    
#     patient_values = list(patient_data.values())
#     patient_values_2d = [patient_values]

#     encoder = OneHotEncoder(handle_unknown='ignore')
#     X_train_encoded = encoder.fit_transform(X_train)
#     X_test_encoded = encoder.transform(patient_values_2d)

#     logreg = LogisticRegression()
#     logreg.fit(X_train_encoded, y_train)

#     model_path = os.path.join(current_dir, 'patientModel.pkl')
#     encoder_path = os.path.join(current_dir, 'encoder.pkl')
#     joblib.dump(logreg, model_path)
#     joblib.dump(encoder, encoder_path)

#     prediction = int(logreg.predict(X_test_encoded)[0])  # Convertendo para int

#     diagnosis = None
#     if prediction == 0:
#         diagnosis = "Normal"
#     elif prediction == 1:
#         diagnosis = "Bipolar Tipo 1"
#     elif prediction == 2:
#         diagnosis = "Bipolar Tipo 2"
#     elif prediction == 3:
#         diagnosis = "Depressão"
#     else:
#         diagnosis = "Diagnóstico não reconhecido"

#     # Retornar o diagnóstico previsto
#     return jsonify({"Resultado": diagnosis})


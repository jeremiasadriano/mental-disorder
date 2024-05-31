from flask import Blueprint, request, jsonify
from models import db, Patient
from markupsafe import escape
import joblib 
import os 

patientBluePrint = Blueprint('patient', __name__)

def convert_to_boolean(value):
    if isinstance(value, bool):
        return value
    value_str = str(value).strip().lower()
    if value_str in ['yes', 'y', 'true', '1']:
        return True
    elif value_str in ['no', 'n', 'false', '0']:
        return False
    else:
        raise ValueError(f"Cannot convert value {value} to boolean")

@patientBluePrint.post('/predict/<int:id>')
def previsao(id):
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'patientModel.pkl')
    encoder_path = os.path.join(current_dir, 'encoder.pkl')

    logreg = joblib.load(model_path)
    encoder = joblib.load(encoder_path)

    data = request.get_json()

    patient_data = {
        'sadness': data['Sadness'],
        'euphoric': data['Euphoric'],
        'exhausted': data['Exhausted'],
        'sleep_disorder': data['Sleep dissorder'],
        'mood_swing': data['Mood Swing'],
        'suicidal_thoughts': data['Suicidal thoughts'],
        'anorexia': data['Anorxia'],
        'authority_respect': data['Authority Respect'],
        'try_explanation': data['Try-Explanation'],
        'aggressive_response': data['Aggressive Response'],
        'ignore_move_on': data['Ignore & Move-On'],
        'nervous_breakdown': data['Nervous Break-down'],
        'admit_mistakes': data['Admit Mistakes'],
        'overthinking': data['Overthinking'],
        'sexual_activity': data['Sexual Activity'],
        'concentration': data['Concentration'],
        'optimism': data['Optimisim']
    }

    patient_values = list(patient_data.values())
    patient_values_2d = [patient_values]

    patient_encoded = encoder.transform(patient_values_2d)

    prediction = int(logreg.predict(patient_encoded)[0])

    diagnosis = None
    if prediction == 0:
        diagnosis = "Normal"
    elif prediction == 1:
        diagnosis = "Bipolar Tipo 1"
    elif prediction == 2:
        diagnosis = "Bipolar Tipo 2"
    elif prediction == 3:
        diagnosis = "Depressão"
    else:
        diagnosis = "Diagnóstico não reconhecido"
        
    try:
        new_patient = Patient(
            user_id=escape(id),  
            sadness=data['Sadness'],
            euphoric=data['Euphoric'],
            exhausted=data['Exhausted'],
            sleep_disorder=data['Sleep dissorder'],

            mood_swing=convert_to_boolean(data['Mood Swing']),
            suicidal_thoughts=convert_to_boolean(data['Suicidal thoughts']),
            anorexia=convert_to_boolean(data['Anorxia']),
            authority_respect=convert_to_boolean(data['Authority Respect']),
            try_explanation=convert_to_boolean(data['Try-Explanation']),
            aggressive_response=convert_to_boolean(data['Aggressive Response']),
            ignore_move_on=convert_to_boolean(data['Ignore & Move-On']),
            nervous_breakdown=convert_to_boolean(data['Nervous Break-down']),
            admit_mistakes=convert_to_boolean(data['Admit Mistakes']),
            overthinking=convert_to_boolean(data['Overthinking']),

            sexual_activity=data['Sexual Activity'],
            concentration=data['Concentration'],
            optimism=data['Optimisim'],
            diagnosis=diagnosis
        )

        db.session.add(new_patient)
        db.session.commit()

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400

    db.session.add(new_patient)
    db.session.commit()

    return jsonify({"Resultado": diagnosis})


@patientBluePrint.get('/user/<int:user_id>/patients')
def get_user_patients(user_id):
    patients = Patient.query.filter_by(user_id=user_id).all()

    patient_data = []

    for patient in patients:
        patient_info = {
            'id': patient.id,
            'sadness': patient.sadness,
            'euphoric': patient.euphoric,
            'exhausted': patient.exhausted,
            'sleep_disorder': patient.sleep_disorder,
            'mood_swing': patient.mood_swing,
            'suicidal_thoughts': patient.suicidal_thoughts,
            'anorexia': patient.anorexia,
            'authority_respect': patient.authority_respect,
            'try_explanation': patient.try_explanation,
            'aggressive_response': patient.aggressive_response,
            'ignore_move_on': patient.ignore_move_on,
            'nervous_breakdown': patient.nervous_breakdown,
            'admit_mistakes': patient.admit_mistakes,
            'overthinking': patient.overthinking,
            'sexual_activity': patient.sexual_activity,
            'concentration': patient.concentration,
            'optimism': patient.optimism,
            'diagnosis': patient.diagnosis
        }
        patient_data.append(patient_info)

    return jsonify({'patients': patient_data})
from flask import Blueprint, request, jsonify
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import os
import pandas as pd
from models import Car, db

car_blueprint = Blueprint('car', __name__)

current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, './cardata.csv')
data = pd.read_csv(model_path)

x = data.drop(['Selling_Price'], axis=1)
x = pd.get_dummies(x, drop_first=True)
y = data['Selling_Price']

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=1)
model = LinearRegression()
model.fit(x_train, y_train)

@car_blueprint.post("/car/<int:user_id>/predict")
def predict_car_price(user_id):
    car_data = request.json

    car_features = {
        'carName': car_data['car_name'],
        'year': car_data['year'],
        'sellingPrice': car_data['selling_price'],
        'presentPrice': car_data['present_price'],
        'kmsDriven': car_data['kms_driven'],
        'fuelType': car_data['fuel_type'],
        'sellerType': car_data['seller_type'],
        'transmission': car_data['transmission'],
        'owner': car_data['owner']
    }

    car_features_df = pd.DataFrame(car_features, index=[0])  
    car_features_encoded = pd.get_dummies(car_features_df, drop_first=True)

    missing_cols = set(x_train.columns) - set(car_features_encoded.columns)
    for col in missing_cols:
        car_features_encoded[col] = 0

    car_features_encoded = car_features_encoded[x_train.columns]

    predicted_price = model.predict(car_features_encoded)[0]

    new_car = Car(
        car_name=car_data['car_name'],
        year=car_data['year'],
        selling_price=car_data['selling_price'],
        present_price=car_data['present_price'],
        kms_driven=car_data['kms_driven'],
        fuel_type=car_data['fuel_type'],
        seller_type=car_data['seller_type'],
        transmission=car_data['transmission'],
        user_id=user_id,
        prediction=predicted_price
    )

    db.session.add(new_car)
    db.session.commit()
    
    return jsonify({'predicted_price': predicted_price})

@car_blueprint.get("/user/<int:user_id>/predictions")
def get_user_predictions(user_id):
    user_predictions = Car.query.filter_by(user_id=user_id).all()

    if not user_predictions:
        return jsonify({'message': 'Nenhuma previsão encontrada para o usuário com o ID fornecido.'}), 404

    predictions = [{'car_name': prediction.car_name,
                    'predicted_price': prediction.prediction} for prediction in user_predictions]

    return jsonify({'user_id': user_id, 'predictions': predictions}), 200
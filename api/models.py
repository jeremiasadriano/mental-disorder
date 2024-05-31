from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    patients = db.relationship('Patient', backref='user', lazy=True, cascade='all, delete-orphan')

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sadness = db.Column(db.String(120), nullable=False)
    euphoric = db.Column(db.String(120), nullable=False)
    exhausted = db.Column(db.String(120), nullable=False)
    sleep_disorder = db.Column(db.String(120), nullable=False)

    mood_swing = db.Column(db.Boolean, nullable=False)
    suicidal_thoughts = db.Column(db.Boolean, nullable=False)
    anorexia = db.Column(db.Boolean, nullable=False)
    authority_respect = db.Column(db.Boolean, nullable=False)
    try_explanation = db.Column(db.Boolean, nullable=False)
    aggressive_response = db.Column(db.Boolean, nullable=False)
    ignore_move_on = db.Column(db.Boolean, nullable=False)
    nervous_breakdown = db.Column(db.Boolean, nullable=False)
    admit_mistakes = db.Column(db.Boolean, nullable=False)
    overthinking = db.Column(db.Boolean, nullable=False)
    
    sexual_activity = db.Column(db.String(120), nullable=False)
    concentration = db.Column(db.String(120), nullable=False)
    optimism = db.Column(db.String(120), nullable=False)
    diagnosis = db.Column(db.String(120), nullable=False)

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    car_name = db.Column(db.String(120), nullable=True)
    year = db.Column(db.Integer, nullable=True)
    selling_price = db.Column(db.Float, nullable=True)
    present_price = db.Column(db.Float, nullable=True)
    kms_driven = db.Column(db.Integer, nullable=True)
    fuel_type = db.Column(db.String(50), nullable=True)
    seller_type = db.Column(db.String(50), nullable=True)
    transmission = db.Column(db.String(50), nullable=True)
    owner = db.Column(db.Integer, nullable=True)
    diagnosis = db.Column(db.String(120), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user = db.relationship('User', backref=db.backref('cars', cascade='all, delete-orphan'))
    prediction = db.Column(db.Float, nullable=True) 
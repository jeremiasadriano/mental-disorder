from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from services.user.userService import userBluePrint
from services.patient.patientService import patientBluePrint
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///user-ml.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

app.register_blueprint(userBluePrint)
app.register_blueprint(patientBluePrint)
CORS(app, resources={r"/*": {"origins": "*"}})

if __name__ == '__main__':
    db.create_all(app=app)
    app.run()

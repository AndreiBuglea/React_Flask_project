from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "http://localhost:5173",
    "http://daiptest.e-uvt.ro",
    "https://daiptest.e-uvt.ro"
])


from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt
)

app.config["JWT_SECRET_KEY"] = "foarte_secret_si_lung_pentru_jwt_flask123!"
jwt = JWTManager(app)


# Conectare MySQL direct pe server
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://admin:4u8eAx0I5Rzy7@localhost/my_app_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)



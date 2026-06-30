from flask import Flask, send_from_directory, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

# 1. Căi și Configurații de bază
UPLOAD_DIRECTORY = "/home/ubuntu/my_app/React_Flask_project/backend/uploads"

app = Flask(__name__)

# 2. Configurare CORS
CORS(app, origins=[
    "http://localhost:5173",
    "http://daiptest.e-uvt.ro",
    "https://daiptest.e-uvt.ro"
])

# 3. Configurare CHEIE PUBLICĂ KEYCLOAK
keycloak_pb_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuU45nruwo3YOidedp2s48Wr/kPmjzTh/hZVlRQzFbo6sv0hdI1zLSWcM3YF1Sn/kBOxoLKVqOrkxXbnnbTTWAxAGXtJsRbFrRr64RsNVkC3E2W7OEjU9Eq+6hCm1+r2eLW5MXnlZn9bSuqEn+FHQ57cVcwCIiraDRz/Pme9FC69nQl8LWIwamGwFVBf5oQHDR4JgMtNyaCna/Pa2kaqP4RxjX5r8w9qbP1WlHScDvpqsTZgD77vkQKTPSrnLWm+tOWyBAnc1H6cvpAx8W0EFG7bLRdgcAzlKEQmdWRofudpRXoQ6N0kGKUZHVyMVZcS0fRbBbmYpDGAEzDFbYAugVwIDAQAB"
# Formatarea PEM corectă
public_key_pem = f"-----BEGIN PUBLIC KEY-----\n{keycloak_pb_key}\n-----END PUBLIC KEY-----"

# 4. Încărcarea setărilor în app.config
# Folosim update pentru a fi siguri că toate valorile sunt injectate corect
app.config.update(
    SQLALCHEMY_DATABASE_URI='mysql+pymysql://admin:4u8eAx0I5Rzy7@localhost/my_app_db',
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    
    # --- SETĂRI JWT PENTRU RS256 ---
    JWT_ALGORITHM="RS256",
    JWT_DECODE_ALGORITHMS=["RS256"],
    JWT_PUBLIC_KEY=public_key_pem,
    JWT_SECRET_KEY="foarte_secret_si_lung_pentru_jwt_flask123!",
    
    # Dezactivăm verificarea audienței pentru a evita erori 422 suplimentare
    JWT_DECODE_AUDIENCE=None,
    
    # Permite erorilor de JWT să apară în consola Flask
    PROPAGATE_EXCEPTIONS=True
)

# 5. Inițializare extensii (Dupa ce am setat config-ul)
db = SQLAlchemy(app)
jwt = JWTManager(app)

@jwt.invalid_token_loader
def my_invalid_token_callback(reason):
    print(f"DEBUG JWT: Token invalid. Motiv: {reason}")
    return jsonify({"msg": reason}), 422

# 6. Rute utilitare
@app.route('/uploads/<path:path>')
def serve_uploads(path):
    return send_from_directory(UPLOAD_DIRECTORY, path)
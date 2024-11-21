from flask import Flask, session, render_template, url_for, jsonify, send_from_directory, redirect
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build')
CORS(app)

@app.route("/")
def index():
    return "sup bishes"

@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}
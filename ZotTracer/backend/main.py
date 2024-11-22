from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build')
CORS(app)

@app.route("/")
def index():
    return "meow"

@app.route("/upload", methods = ["POST"])
def get_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    print("file received", file)
    f = []

    return jsonify({"message": "File uploaded successfully", "outlined_file": f}), 200

@app.route("/get_drawn_svg", methods = ["POST"])
def get_drawn_svg():
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    print("file received", file)
    f = []

    return jsonify({"message": "File uploaded successfully", "outlined_file": f}), 200

@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}
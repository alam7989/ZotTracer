from multiprocessing import ProcessError
from flask import Flask, request, jsonify
from flask_cors import CORS
import process_image

app = Flask(__name__, static_folder='frontend/build')
CORS(app, resources={r"/upload": {"origins": ["http://localhost:5173", "*"]}})

@app.route("/")
def index():
    return "meow"

@app.route("/upload", methods = ["POST"])
def get_file():
    # error checking
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    print("file received", file)
    f = []
    # mask the file (color block)
    process_image.getMask(file)

    return jsonify({"message": "File uploaded successfully", "outlined_file": f}), 200

@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}
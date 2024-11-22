from multiprocessing import ProcessError
from flask import Flask, request, jsonify
from flask_cors import CORS
import process_image


app = Flask(__name__, static_folder='frontend/build')
CORS(app, origins=['*'])

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

@app.route("/get_drawn_svg", methods = ["POST"])
def get_drawn_svg():
    data = request.json  # Parse JSON data from the request
    svg_content = data.get('svg')  # Get the SVG content

    if svg_content:
        # Save the SVG content to a file (optional)
        with open("output.svg", "w") as svg_file:
            svg_file.write(svg_content)
        return jsonify({"message": "SVG received successfully!"}), 200
    else:
        return jsonify({"error": "No SVG data received!"}), 400

@app.route("/api/data")
def get_data():
    return {"message": "Hello from Flask!"}
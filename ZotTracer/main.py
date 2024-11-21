from flask import Flask, session, render_template, url_for, jsonify, send_from_directory, redirect
from flask_cors import CORS

app = Flask(__name__, static_folder='frontend/build')
CORS(app)

@app.route("/", defaults={"path": ""})
def proxy_to_react(path):
    # React development server URL
    react_dev_server = "http://localhost:3000"

    # Redirect requests to React dev server
    if path == "" or path.endswith(".js") or path.endswith(".css") or path.endswith(".map") or path.endswith(".ico"):
        return redirect(f"{react_dev_server}/{path}")

    # Handle API routes
    if path.startswith("api"):
        return "This is an API route!"

    # Fallback to React for other frontend routes
    return redirect(react_dev_server)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)
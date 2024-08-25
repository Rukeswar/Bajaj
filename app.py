from flask import Flask, render_template, request, jsonify, send_from_directory
import json

app = Flask(__name__, static_folder='.', template_folder='.')

def process_data(input_data):
    try:
        data = json.loads(input_data)
        if not isinstance(data.get("data"), list):
            return {"is_success": False, "error": "Invalid input format"}

        user_id = "john_doe_17091999"  # Replace with your own logic if needed
        email = "john@xyz.com"
        roll_number = "ABCD123"

        numbers = [item for item in data["data"] if item.isdigit()]
        alphabets = [item for item in data["data"] if item.isalpha()]
        lowercase_alphabets = [char for char in alphabets if char.islower()]
        highest_lowercase = max(lowercase_alphabets) if lowercase_alphabets else None

        return {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
        }

    except json.JSONDecodeError:
        return {"is_success": False, "error": "Invalid JSON format"}

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

@app.route('/app.js')
def script():
    return send_from_directory('.', 'app.js')

@app.route('/process', methods=['POST'])
def process():
    input_json = request.form.get('jsonInput', '')
    result = process_data(input_json)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

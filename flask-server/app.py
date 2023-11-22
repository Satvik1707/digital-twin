from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/lr-model/*": {"origins": "http://localhost:3000"}})

@app.route('/lr-model/<float:avg_connected_ue_value>', methods=['GET'])
def model_1(avg_connected_ue_value):
    try:
        result = subprocess.run(['python', 'models/Model-1/LR.py', str(avg_connected_ue_value)], capture_output=True, text=True)
        
        if result.returncode == 0:
            return jsonify({'result': result.stdout})
        else:
            return jsonify({'error': result.stderr}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/model-2', methods=['GET'])
def model_2():
    return "Model 2"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
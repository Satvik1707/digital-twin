from flask import Flask
import pickle
import numpy as np

app = Flask(__name__)

@app.route('/model-1', methods=['GET'])
def model_1():
    return "Model 1"

@app.route('/model-2', methods=['GET'])
def model_2():
    return "Model 2"

if __name__ == "__main__":
    app.run(port=5000, debug=True)
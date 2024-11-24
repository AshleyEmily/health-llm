import time
import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from processInputs import sendToLlama 


app = Flask(__name__)
CORS(app) 

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/chat', methods=['POST'])
def askChat():
    data = request.get_json()  # Get the data sent from the frontend (React)
    user_message = data.get('message', '')  # Extract the 'message' key from the data
    res = sendToLlama(user_message)
    print("####################", res.content, type(res.content))
    return jsonify({'response': res.content}), 201
    # return {'time': time.time()}

if __name__ == '__main__':
   app.run(port=5000)
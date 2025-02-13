from flask import Flask, render_template, jsonify, send_from_directory, abort
import json
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)

try:
    with open('data.json', 'r', encoding='utf-8') as f:
        panoramas = json.load(f)
except FileNotFoundError:
    logging.error("data.json not found")
    panoramas = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/panoramas')
def get_all_panoramas():
    return jsonify(panoramas)

@app.route('/static/panoramas/<path:filename>')
def serve_panorama(filename):
    try:
        return send_from_directory('static/panoramas', filename)
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
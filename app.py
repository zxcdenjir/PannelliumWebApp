from flask import Flask, render_template, jsonify, send_from_directory
import json

app = Flask(__name__)

with open('data.json', 'r', encoding='utf-8') as f:
    panoramas = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/panoramas')
def get_all_panoramas():
    return jsonify(panoramas)

@app.route('/static/panoramas/<path:filename>')
def serve_panorama(filename):
    return send_from_directory('static/panoramas', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
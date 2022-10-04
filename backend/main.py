import json
import requests as req
from flask_cors import cross_origin
from flask import Flask, request, redirect, jsonify, Response


app = Flask(__name__)
secret = "xyz"
url = "https://www.google.com/recaptcha/api/siteverify"


@app.route("/", methods=["POST", "GET"])
@cross_origin()
def verify():
    if request.method == 'POST':
        raw_data = request.get_json(force=True)
        response = raw_data.get("g-recaptcha-response", None)
        if response:
            result = req.get(url, params={'secret':secret, 'response':response}).json()['success']
            return Response(json.dumps({"verified":result}), mimetype='application/json; charset=utf-8')
        return Response(json.dumps({"verified":False}), mimetype='application/json; charset=utf-8')
    else: return redirect("https://xyz.me", 301)


if __name__ == "__main__":
    app.run()
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create Flask app
api = Blueprint('api', __name__)

# SIGN UP
@api.route("/signup", methods=['POST'])
def sign_up():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email is None:
        return jsonify({"msg": "email not entered"}), 401
    elif password is None:
        return jsonify({"msg": "password not entered"}), 401
    else: 
        new_user = User(email,password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.serialize()), 200

# GET ALL USERS
@api.route("/users", methods=['GET'])
def get_users():
    all_users = User.query.all()
    all_users = list(map(lambda x: x.serialize(), all_users))
    json_text = jsonify(all_users)
    return json_text

# GET ONE USER DATA
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    print("user info")
    print(user)
    # return jsonify(logged_in_as=current_user), 200
    return jsonify(user.serialize()), 200


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
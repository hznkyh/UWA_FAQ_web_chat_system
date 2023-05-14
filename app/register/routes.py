from app import app, db
from app.models import User
from flask import Flask,render_template,flash, redirect, url_for, session,logging, request, jsonify
# from flask_login import LoginManager, login_required, current_user, login_user
from werkzeug.security import generate_password_hash, check_password_hash
from app.register import register_blueprint

# register function
@register_blueprint.route("/register/", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user = User.query.filter_by(email=request.form['email']).first()
        print(user)
        # Check if the user exists
        if user:
            # return render_template("reg_view.html", msg = "Email already exists")
            return jsonify({'success': False, 'message': 'Email already exists'}), 401
    
        email = request.form['email'].lower()
        first_name = request.form['firstname']
        last_name = request.form['lastname']
        password = request.form['newPW']
        hashed_pw = generate_password_hash(password, method='scrypt')
        register = User(email= email, first_name = first_name, last_name = last_name, password = hashed_pw)
        print(register)
        db.session.add(register)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Account successfully created'}), 200
    return render_template("reg_view.html")

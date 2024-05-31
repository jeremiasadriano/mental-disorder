from flask import Blueprint, request, jsonify
from models import db, User
userBluePrint = Blueprint('user', __name__)

@userBluePrint.post('/register')
def register_user():
    data = request.get_json()
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Novo usuário registrado!'}),201

@userBluePrint.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or user.password != data['password']:
        return jsonify({'message': 'Credenciais inválidas!'}), 401 
    return jsonify({'user_id': user.id, 'message': 'Login bem-sucedido!'}), 200

@userBluePrint.get('/users/<user_id>')
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado!'}),404
    return jsonify({'username': user.username, 'email': user.email}),200

@userBluePrint.put('/users/<user_id>')
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado!'}),404
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)
    user.password = data.get('password', user.password)
    db.session.commit()
    return jsonify({'message': 'Dados do usuário atualizados!'}), 200

@userBluePrint.delete('/users/<user_id>')
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado!'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuário deletado!'}), 204

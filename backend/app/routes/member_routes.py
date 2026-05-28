from flask import Blueprint, request, jsonify

from app.config.database import db
from app.models.member_model import Member

member_bp = Blueprint('member_bp', __name__)

# GET ALL MEMBERS
@member_bp.route('/members', methods=['GET'])
def get_members():
    members = Member.query.all()

    result = [member.to_dict() for member in members]

    return jsonify(result)

# CREATE MEMBER
@member_bp.route('/members', methods=['POST'])
def create_member():
    data = request.get_json()

    new_member = Member(
        name=data['name'],
        address=data['address'],
        phone_number=data['phone_number'],
        email=data['email']
    )

    db.session.add(new_member)
    db.session.commit()

    return jsonify({
        "message": "Member created successfully"
    })

# UPDATE MEMBER
@member_bp.route('/members/<int:id>', methods=['PUT'])
def update_member(id):
    member = Member.query.get(id)

    if not member:
        return jsonify({
            "message": "Member not found"
        }), 404

    data = request.get_json()

    member.name = data['name']
    member.address = data['address']
    member.phone_number = data['phone_number']
    member.email = data['email']

    db.session.commit()

    return jsonify({
        "message": "Member updated successfully"
    })

# DELETE MEMBER
@member_bp.route('/members/<int:id>', methods=['DELETE'])
def delete_member(id):
    member = Member.query.get(id)

    if not member:
        return jsonify({
            "message": "Member not found"
        }), 404

    db.session.delete(member)
    db.session.commit()

    return jsonify({
        "message": "Member deleted successfully"
    })
from flask import Blueprint, request, jsonify

from app.config.database import db
from app.models.category_model import Category

category_bp = Blueprint('category_bp', __name__)

# GET ALL CATEGORIES
@category_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()

    result = [category.to_dict() for category in categories]

    return jsonify(result)

# CREATE CATEGORY
@category_bp.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()

    new_category = Category(
        category_name=data['category_name']
    )

    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        "message": "Category created successfully"
    })

# UPDATE CATEGORY
@category_bp.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    category = Category.query.get(id)

    if not category:
        return jsonify({
            "message": "Category not found"
        }), 404

    data = request.get_json()

    category.category_name = data['category_name']

    db.session.commit()

    return jsonify({
        "message": "Category updated successfully"
    })

# DELETE CATEGORY
@category_bp.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get(id)

    if not category:
        return jsonify({
            "message": "Category not found"
        }), 404

    db.session.delete(category)
    db.session.commit()

    return jsonify({
        "message": "Category deleted successfully"
    })
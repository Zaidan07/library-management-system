from flask import Blueprint, request, jsonify

from app.config.database import db
from app.models.book_model import Book

book_bp = Blueprint('book_bp', __name__)

# GET ALL BOOKS
@book_bp.route('/books', methods=['GET'])
def get_books():
    books = Book.query.all()

    result = [book.to_dict() for book in books]

    return jsonify(result)

# CREATE BOOK
@book_bp.route('/books', methods=['POST'])
def create_book():
    data = request.get_json()

    new_book = Book(
        title=data['title'],
        author=data['author'],
        publisher=data['publisher'],
        publication_year=data['publication_year'],
        stock=data['stock'],
        id_category=data['id_category']
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify({
        "message": "Book created successfully"
    })

# UPDATE BOOK
@book_bp.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    book = Book.query.get(id)

    if not book:
        return jsonify({
            "message": "Book not found"
        }), 404

    data = request.get_json()

    book.title = data['title']
    book.author = data['author']
    book.publisher = data['publisher']
    book.publication_year = data['publication_year']
    book.stock = data['stock']
    book.id_category = data['id_category']

    db.session.commit()

    return jsonify({
        "message": "Book updated successfully"
    })

# DELETE BOOK
@book_bp.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)

    if not book:
        return jsonify({
            "message": "Book not found"
        }), 404

    db.session.delete(book)
    db.session.commit()

    return jsonify({
        "message": "Book deleted successfully"
    })
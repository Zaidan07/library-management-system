from flask import Flask
from flask_cors import CORS

from app.config.database import db
from app.models.category_model import Category
from app.routes.category_routes import category_bp
from app.models.member_model import Member
from app.routes.member_routes import member_bp
from app.models.book_model import Book
from app.routes.book_routes import book_bp

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/perpustakaan_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

app.register_blueprint(category_bp)
app.register_blueprint(book_bp)
app.register_blueprint(member_bp)

@app.route("/")
def home():
    return "Library Management Backend Running!"

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
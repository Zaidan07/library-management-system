from app.config.database import db

class Book(db.Model):
    __tablename__ = 'books'

    id_book = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(150), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    publisher = db.Column(db.String(100), nullable=False)

    publication_year = db.Column(db.Integer, nullable=False)

    stock = db.Column(db.Integer, nullable=False)

    id_category = db.Column(
        db.Integer,
        db.ForeignKey('categories.id_category'),
        nullable=False
    )

    def to_dict(self):
        return {
            "id_book": self.id_book,
            "title": self.title,
            "author": self.author,
            "publisher": self.publisher,
            "publication_year": self.publication_year,
            "stock": self.stock,
            "id_category": self.id_category
        }
from app.config.database import db

class Category(db.Model):
    __tablename__ = 'categories'

    id_category = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_category": self.id_category,
            "category_name": self.category_name
        }
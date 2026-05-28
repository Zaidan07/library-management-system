from app.config.database import db

class Member(db.Model):
    __tablename__ = 'members'

    id_member = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_member": self.id_member,
            "name": self.name,
            "address": self.address,
            "phone_number": self.phone_number,
            "email": self.email
        }
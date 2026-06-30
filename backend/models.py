from config import db
from datetime import datetime


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }


"""class WPPage(db.Model):
    __tablename__ = "wp_testingposts"
    ID = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.Text)
    post_content = db.Column(db.Text)
    post_type = db.Column(db.String(20))
    post_status = db.Column(db.String(20))
    post_name = db.Column(db.String(200))
    post_excerpt = db.Column(db.Text)
    """
class WPPage(db.Model):
    __tablename__ = "wp_testingposts"
    ID = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.Text)
    post_content = db.Column(db.Text)
    post_type = db.Column(db.String(20))
    post_status = db.Column(db.String(20))
    post_name = db.Column(db.String(200))
    post_excerpt = db.Column(db.Text, default="")
    post_content_filtered = db.Column(db.Text, default="")
    to_ping = db.Column(db.Text, default="")
    pinged = db.Column(db.Text, default="")
    post_parent = db.Column(db.Integer, default=0)
    guid = db.Column(db.String(255), default="")
    menu_order = db.Column(db.Integer, default=0)
    post_mime_type = db.Column(db.String(100), default="")
    comment_count = db.Column(db.Integer, default=0)
    


class WPPost(db.Model):
    __tablename__ = "wp_posts"
    ID = db.Column(db.Integer, primary_key=True)
    post_title = db.Column(db.String(255))
    post_content = db.Column(db.Text)
    post_status = db.Column(db.String(20))


# --- Model pentru relațiile term-taxonomy ---
class WPTermRelationship(db.Model):
    __tablename__ = "wp_term_relationships"
    object_id = db.Column(db.Integer, primary_key=True)
    term_taxonomy_id = db.Column(db.Integer, primary_key=True)
    term_order = db.Column(db.Integer)


class WPMeta(db.Model):
    __tablename__ = "wp_testingpostmeta"
    
    meta_id    = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    post_id    = db.Column(db.BigInteger, nullable=False, index=True)
    meta_key   = db.Column(db.String(255), nullable=False, index=True)
    meta_value = db.Column(db.Text, nullable=True)


class Anunt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_proiect = db.Column(db.String(100), nullable=False)
    program = db.Column(db.String(50))
    titlu = db.Column(db.String(200))
    posturi = db.Column(db.String(200))
    perioada = db.Column(db.String(50))
    anunt = db.Column(db.Text)
    #link_pdf = db.Column(db.String(500))
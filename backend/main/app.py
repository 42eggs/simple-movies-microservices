import requests
from flask import Flask, jsonify, abort
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import UniqueConstraint
from sqlalchemy import inspect
from producer import publish

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://nishan:password@db/main'
CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)


# app.app_context().push()
# db.create_all()


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=False)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


class MovieUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    movie_id = db.Column(db.Integer)
    UniqueConstraint('user_id', 'product_id', name='user_product_unique')

    def toDict(self):
        return {c.key: getattr(self, c.key) for c in inspect(self).mapper.column_attrs}


@app.route('/api/movies')
def getMovies():
    movies = Movie.query.all()
    movies_arr = []
    for movie in movies:
        movies_arr.append(movie.toDict())
    return jsonify(movies_arr)


@app.route('/api/movies/<int:id>/like', methods=['POST'])
def like(id):
    req = requests.get('http://host.docker.internal:8000/api/user')
    json = req.json()

    try:
        movie_user = MovieUser(user_id=json['id'], movie_id=id)
        db.session.add(movie_user)
        db.session.commit()
        publish('movie_liked', id)


    except:
        abort(400, 'You already liked this product')

    return jsonify({
        'message': 'success'
    })


#
# @app.route('/')
# def index():
#     return 'Hello'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

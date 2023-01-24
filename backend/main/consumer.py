import json
import pika

from app import Movie, db, app
app.app_context().push()
db.create_all()


params = pika.URLParameters('your-rabbit-mq-url')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='main')


def callback(channel, method, properties, body):
    print('Receieved in main')
    data = json.loads(body)
    print(data)

    if properties.content_type == 'movie_created':
        with app.app_context():
            movie = Movie(
                id=data['id'], title=data['title'], image=data['image'])
            db.session.add(movie)
            db.session.commit()
        print('Product Created')

    elif properties.content_type == 'movie_updated':
        with app.app_context():
            movie = Movie.query.get(int(data['id']))
            movie.title = data['title']
            movie.image = data['image']
            db.session.commit()
        print('Product Updated')

    elif properties.content_type == 'movie_deleted':
        with app.app_context():
            movie = Movie.query.get(data)
            db.session.delete(movie)
            db.session.commit()
        print('Product Deleted')


channel.basic_consume(
    queue='main', on_message_callback=callback, auto_ack=True)

print('Started Consuming')

channel.start_consuming()

channel.close()

import pika, json, os, django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'admin.settings')
django.setup()

from movies.models import Movie

params = pika.URLParameters('rabbitmqurl')
connection = pika.BlockingConnection(params)
channel = connection.channel()
channel.queue_declare(queue='admin')


def callback(channel, method, properties, body):
    print('Received in admin')
    movieId = json.loads(body)
    print(movieId)
    movie = Movie.objects.get(id=movieId)
    movie.likes = movie.likes + 1
    movie.save()
    print('Movie likes increased')


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print('Started consuming')

channel.start_consuming()

channel.close()

import os

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "taskboard.settings.base")

app = Celery("taskboard")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
app.autodiscover_tasks(["tasks"], related_name="celery_tasks")

from celery import shared_task


@shared_task
def send_task_notification(task_id):
    print(f"[celery] Task {task_id} was created.")
    return True

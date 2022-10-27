from fastapi import APIRouter
from config.db import conn
from schemas.task import taskEntity, tasksEntity
from models.task import Task

task = APIRouter()

@task.get('/tasks')
def find_all_tasks():
    return tasksEntity(conn.local.task.find())

@task.post('/tasks')
def create_task(task: Task):
    new_task = dict(task)
    print(new_user)
    return "Received"

@task.get('/tasks/{id}')
def find_task():
    return "hw"

@task.put('/tasks/{id}')
def update_task():
    return "hw"

@task.delete('/tasks/{id}')
def delete_task():
    return "hw"
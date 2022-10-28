from fastapi import APIRouter, Response, status
from bson import ObjectId

from config.db import conn
from schemas.task import taskEntity, tasksEntity
from models.task import Task
from starlette.status import HTTP_204_NO_CONTENT

task = APIRouter()


@task.get('/tasks', response_model=list[Task], tags=["Tasks"])
def find_all_tasks():
    print("\n[*] Showing all Tasks\n")
    return tasksEntity(conn.local.task.find())


@task.post('/tasks', response_model=Task, tags=["Tasks"])
async def create_task(task: Task):
    new_task = dict(task)
    id = conn.local.task.insert_one(new_task).inserted_id
    task = conn.local.task.find_one({"_id": id})
    return taskEntity(task)


@task.get('/tasks/{id}', response_model=Task, tags=["Tasks"])
def find_task(id: str):
    print("\n[*] Showing Task: " + id + "\n")
    return taskEntity(conn.local.task.find_one({"_id": ObjectId(id)}))


@task.put('/tasks/{id}', response_model=Task, tags=["Tasks"])
def update_task(id: str, task: Task):
    conn.local.task.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(task)})
    print("\n[*] Updated Task: " + id + "\n")
    return taskEntity(conn.local.task.find_one({"_id": ObjectId(id)}))


@task.delete('/tasks/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=["Tasks"])
def delete_task(id: str):
    print("\n[*] Deleted Task: " + id + "\n")
    conn.local.task.find_one_and_delete({"_id": ObjectId(id)})
    return Response(status_code=HTTP_204_NO_CONTENT)

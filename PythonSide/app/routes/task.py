from fastapi import APIRouter, Response, status
from bson import ObjectId

from config.db import conn
from schemas.task import taskEntity, tasksEntity
from models.task import Task
from starlette.status import HTTP_204_NO_CONTENT

"""
DB: MongoDB connection to 'pstudioDB' database
"""

DB = conn.pstudioDB

task = APIRouter()

# Get all tasks
@task.get('/tasks', response_model=list[Task], tags=["Tasks"])
def find_all_tasks():
    print("\n[*] Showing all Tasks\n")
    return tasksEntity(DB.task.find())

# Get task by ID
@task.get('/tasks/{id}', response_model=Task, tags=["Tasks"])
def find_task(id: str):
    print("\n[*] Showing Task: " + id + "\n")
    return taskEntity(DB.task.find_one({"_id": ObjectId(id)}))

# Create new task
@task.post('/tasks', response_model=Task, tags=["Tasks"])
async def create_task(task: Task):
    new_task = dict(task)
    id = DB.task.insert_one(new_task).inserted_id
    task = DB.task.find_one({"_id": id})
    return taskEntity(task)

# Update task by ID
@task.put('/tasks/{id}', response_model=Task, tags=["Tasks"])
def update_task(id: str, task: Task):
    DB.task.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(task)})
    print("\n[*] Updated Task: " + id + "\n")
    return taskEntity(DB.task.find_one({"_id": ObjectId(id)}))

# Delete task by ID
@task.delete('/tasks/{id}', status_code=status.HTTP_204_NO_CONTENT, tags=["Tasks"])
def delete_task(id: str):
    print("\n[*] Deleted Task: " + id + "\n")
    DB.task.find_one_and_delete({"_id": ObjectId(id)})
    return Response(status_code=HTTP_204_NO_CONTENT)
from fastapi import FastAPI, APIRouter

from routes.task import task

app = FastAPI(
    title="Programmer Studio API",
    description="REST API with MongoDB",
    version="1.0"
    )

app.include_router(task)
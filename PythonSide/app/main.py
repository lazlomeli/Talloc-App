from fastapi import FastAPI, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path
from routes.task import task
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Programmer Studio API",
    description="REST API with MongoDB",
    version="1.0"
    )

origins = ["http://gateway_api:8002"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)
from fastapi import FastAPI, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path
from routes.task import task
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings

app = FastAPI(
    title="Talloc App - Task API",
    version="1.0"
    )

origins = [settings.GATEWAY_API_URL_DOCKER]
# origins = [settings.GATEWAY_API_URL]

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
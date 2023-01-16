from fastapi import FastAPI, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path
from routes.task import task


app = FastAPI(
    title="Programmer Studio API",
    description="REST API with MongoDB",
    version="1.0"
    )

app.include_router(task)

if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)
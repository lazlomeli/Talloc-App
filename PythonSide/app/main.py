from fastapi import FastAPI, APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pathlib import Path
from routes.task import task


templates = Jinja2Templates(directory="templates")

app = FastAPI(
    title="Programmer Studio API",
    description="REST API with MongoDB",
    version="1.0"
    )

app.include_router(task)


@app.get("/", response_class=HTMLResponse)
def main_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == '__main__':
    import uvicorn

    uvicorn.run("main:app", reload=True)
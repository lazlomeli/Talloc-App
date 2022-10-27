from fastapi import FastAPI, APIRouter, Query, HTTPException, Request

from routes.task import task


app = FastAPI(title="Programmer Studio API")
app.include_router(task)
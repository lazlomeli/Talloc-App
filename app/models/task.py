from typing import Optional
from pydantic import BaseModel

class Task(BaseModel):
    id: Optional[str]
    title: str
    programming_language: str
    start_date: str
    end_date: str
    status: str
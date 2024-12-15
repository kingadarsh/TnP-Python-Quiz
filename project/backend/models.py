from pydantic import BaseModel
from typing import List

class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_answer: str

class Answer(BaseModel):
    answer: str
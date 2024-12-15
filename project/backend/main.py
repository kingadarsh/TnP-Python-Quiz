from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
import random
from .questions import quiz_questions
from .models import Answer

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Quiz API"}

@app.get("/questions")
def get_questions():
    shuffled_questions = random.sample(quiz_questions, len(quiz_questions))
    return shuffled_questions

@app.post("/check-answer/{question_id}")
def check_answer(question_id: int, answer: Answer = Body(...)):
    question = next((q for q in quiz_questions if q["id"] == question_id), None)
    if not question:
        return {"error": "Question not found"}
    
    is_correct = answer.answer == question["correct_answer"]
    return {
        "correct": is_correct,
        "correct_answer": question["correct_answer"]
    }
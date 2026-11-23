from pathlib import Path
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="KinShow production engine", version="0.1.0")
DEMO = json.loads((Path(__file__).parents[1] / "data" / "demo.json").read_text())

class Story(BaseModel):
    id: str = Field(min_length=1, max_length=40)
    relative: str = Field(min_length=2, max_length=80)
    year: str = Field(pattern=r"^[0-9]{4}$")
    story: str = Field(min_length=20, max_length=500)
    answer: str = Field(min_length=2, max_length=80)
    approved: bool

class ShowRequest(BaseModel):
    honoree: str = Field(min_length=2, max_length=60)
    format: str = Field(pattern=r"^(Story quiz|Family Feud|Photo reveal)$")
    stories: list[Story] = Field(min_length=2, max_length=12)

@app.get("/health")
def health(): return {"status": "ok"}

@app.post("/shows")
def create_show(body: ShowRequest):
    approved = [s for s in body.stories if s.approved]
    if len(approved) < 2:
        raise HTTPException(422, detail="At least two approved stories are required")
    rounds = [{"id": s.id, "position": i + 1, "prompt": f"What did {body.honoree} remember from {s.year}?", "answer": s.answer, "source": s.relative, "hostCue": f"Invite {s.relative.split(' · ')[0]} to share the full story."} for i, s in enumerate(approved)]
    return {"fixture": "fictional-demo", "format": body.format, "durationMinutes": len(rounds) * 5 + 5, "rounds": rounds, "requiresHumanFactCheck": True}

@app.get("/demo")
def demo(): return DEMO

from copy import deepcopy
from fastapi.testclient import TestClient
from api.main import app, DEMO
client = TestClient(app)

def payload(): return {"honoree":"Ruth","format":"Story quiz","stories":deepcopy(DEMO["stories"])}
def test_health(): assert client.get("/health").json() == {"status":"ok"}
def test_builds_show_from_approved_stories():
    res=client.post("/shows",json=payload())
    assert res.status_code==200
    body=res.json(); assert len(body["rounds"])==3; assert body["requiresHumanFactCheck"] is True
def test_rejects_too_few_approved_stories():
    body=payload(); body["stories"][1]["approved"]=False; body["stories"][2]["approved"]=False
    res=client.post("/shows",json=body); assert res.status_code==422; assert "approved" in res.json()["detail"]
def test_rejects_invalid_format():
    body=payload(); body["format"]="Surprise me"
    assert client.post("/shows",json=body).status_code==422

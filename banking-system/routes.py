from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import Incident
import shutil
import os

app = FastAPI()

UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"image_url": f"/{file_path}"}

@app.post("/incidents/")
async def create_incident(
    title: str = Form(...),
    description: str = Form(...),
    created_by: int = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    if len(title) < 5:
        raise HTTPException(status_code=400, detail="Заголовок слишком короткий")

    image_url = None
    if file:
        file_path = f"{UPLOAD_DIR}/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        image_url = f"/{file_path}"

    incident = Incident(title=title, description=description, image_url=image_url, created_by=created_by)
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import librosa
import numpy as np

app = FastAPI()

class AudioFile(BaseModel):
    file: UploadFile

@app.post("/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    # Load audio file
    audio, sr = librosa.load(file.file)

    # Detect BPM
    tempo, beats = librosa.beat.beat_track(y=audio, sr=sr)
    bpm = tempo

    # Detect key
    # For simplicity, we'll use a basic key detection algorithm
    # In a real application, you'd want to use a more robust algorithm
    key = "C Major"  # placeholder

    return JSONResponse(content={"bpm": bpm, "key": key})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

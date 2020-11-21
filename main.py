from fastapi import FastAPI, File, Form, UploadFile

app = FastAPI()


@app.post("/files/")
async def create_file(filea: UploadFile = File(...), fileb: UploadFile = File(...)):
    # do something
    return {
        "file_size_a": filea.filename,
        "file_size_b": fileb.filename,
    }
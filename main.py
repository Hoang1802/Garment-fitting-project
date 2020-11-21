from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    image64: str
    imageUrl: str

@app.post("/files/")
async def create_file(item: Item):
    img_url = item.imageUrl
    img_output = "images/output_garment/"+img_url.split("/")[-1]
    return img_output
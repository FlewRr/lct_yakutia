from pathlib import Path

import pandas as pd
import io
from catboost import CatBoostClassifier
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, RedirectResponse
from starlette.staticfiles import StaticFiles

from ml.model import Classifier

app = FastAPI()

model_path= Path("ml/model_bin/model.cbm")

# Базовые пути
prediction_json_path = Path("../front/prediction.json")
html_path = Path("../front/src")
img_path = Path("../front/src/img")
css_path = Path("../front/src/css")
js_path = Path("../front/src/js")
# Установка статических файлов
app.mount("/static", StaticFiles(directory=html_path), name="static")
app.mount("/img", StaticFiles(directory=img_path), name="img")
app.mount("/css", StaticFiles(directory=css_path), name="css")
app.mount("/js", StaticFiles(directory=js_path), name="js")
@app.get("/")
async def get_index_html():

    return FileResponse(html_path / "index.html")

@app.get("/upload")
async def get_upload_html():
    return FileResponse(html_path / "upload.html")

@app.get("/result")
async def get_result_html():
    return FileResponse(html_path / "result.html")


@app.post("/upload")
async def post_info(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        contents_str = contents.decode("utf-8")
        df = pd.read_csv(io.StringIO(contents_str))

        model = Classifier(CatBoostClassifier(), model_path)
        model.predict_json(df, prediction_json_path)
    except Exception as e:
        return RedirectResponse(url="/upload", status_code=303)

    await file.close()
    return RedirectResponse(url="/result", status_code=303)
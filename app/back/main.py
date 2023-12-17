import json
from pathlib import Path

import pandas as pd
import io
from catboost import CatBoostClassifier
from fastapi import FastAPI, UploadFile, File, Request
from fastapi.responses import FileResponse, RedirectResponse
from starlette.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates

from ml.model import Classifier

app = FastAPI()

model_path= Path("ml/model_bin/model.cbm")

# Базовые пути todo(поменять)
prediction_json_path = Path("../front/app/js/prediction.json")
html_path = Path("../front/app")
img_path = Path("../front/app/img")
css_path = Path("../front/app/css")
js_path = Path("../front/app/js")
# Установка статических файлов
app.mount("/static", StaticFiles(directory=html_path), name="static")
app.mount("/img", StaticFiles(directory=img_path), name="img")
app.mount("/css", StaticFiles(directory=css_path), name="css")
app.mount("/js", StaticFiles(directory=js_path), name="js")

templates = Jinja2Templates(directory=html_path)

@app.get("/")
async def get_index_html():

    return FileResponse(html_path / "index.html")

@app.get("/upload")
async def get_upload_html():
    return FileResponse(html_path / "upload.html")

@app.get("/result")
async def get_result_html(request: Request):
    with open(prediction_json_path, 'r') as file:
        my_data = json.load(file)
    return templates.TemplateResponse("result.html", {"request": request, "data": my_data})


@app.post("/upload")
async def post_info(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        await file.close()
        contents_str = contents.decode("utf-8")
        df = pd.read_csv(io.StringIO(contents_str))

        model = Classifier(CatBoostClassifier(), model_path)
        model.predict_json(df, prediction_json_path)

    except Exception as e:
        return RedirectResponse(url="/upload", status_code=303)


    return RedirectResponse(url="/result", status_code=303)
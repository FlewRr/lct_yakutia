from catboost import CatBoostClassifier
import json
import pandas as pd

TEST_DATA_PATH = "/home/yagub/PycharmProjects/lct_yakutia/app/back/ml/data/test.csv"


class Classifier:
    def __init__(self, model, bin_path):
        self.model = model.load_model(bin_path)
        self.data_columns = list(pd.read_csv(TEST_DATA_PATH).drop(columns="Вердикт").columns)

    def predict(self, data):
        assert self.data_columns == list(data.columns)


        prediction = self.model.predict_proba(data)
        probabilities = [probability[1] for probability in prediction]

        return probabilities, list(data.ID)
    
    def predict_json(self, data, path):
        probs, ids = self.predict(data)

        probs_dict = {key : value for key, value in zip(ids, probs)}
        open(path, 'a')
        with open(path, 'w') as fp:
            json.dump(probs_dict, fp)

        return probs_dict

# model = Classifier( CatBoostClassifier(), "app/ml/model_bin/model.cbm")

# data = pd.read_csv("app/ml/data/GENERATED_DATASET.csv")[:10].drop(columns='Вердикт')

# print(model.predict_json(data, JSON_DATA_PATH))
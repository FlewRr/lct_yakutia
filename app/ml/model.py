from catboost import CatBoostClassifier

class Classifier:
    def __init__(self, model, bin_path):
        self.model = model.load_model(bin_path)

    def predict(self, data):
        prediction = self.model.predict_proba(data)
        probabilities = [probability[1] * 100 for probability in prediction]

        return probabilities
    

model = Classifier("model_bin/model.cbm")

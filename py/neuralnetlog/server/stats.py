import pickle
import json
from neuralNetLog.toJSON import toJSON


def load_stats(file_name: str):
    with open(file_name, 'rb') as in_file:
        return pickle.load(in_file)


def load_stats_json(file_name: str):
    stats = load_stats(file_name)
    stats_dict = [stat.to_dict() for stat in stats]
    return json.dumps(toJSON(stats_dict)).encode()

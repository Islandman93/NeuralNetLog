import pickle
import json
import os
from neuralNetLog.toJSON import toJSON


def load_logs(file_dir: str):
    events = load_log(file_dir, 'events')
    stats = load_log(file_dir, 'stats')
    checkpoints = load_log(file_dir, 'checkpoints')

    return events, stats, checkpoints


def load_log(file_dir: str, file_name: str):
    if os.path.isfile(file_dir + file_name + '.json') or os.path.isfile(file_dir + file_name + '.pkl'):
        # if pickle
        if os.path.isfile(file_dir + file_name + '.pkl'):
            with open(file_dir + file_name + '.pkl', 'rb') as in_file:
                # pickle files are written with append so we need to continously read until empty
                # http://stackoverflow.com/questions/12761991/how-to-use-append-with-pickle-in-python
                data = []
                while True:
                    try:
                        data.append(toJSON(pickle.load(in_file)))
                    except EOFError:
                        break

                return data
        else:  # json
            with open(file_dir + file_name + '.json', 'r') as in_file:
                data = []
                # json are appended by line
                for line in in_file.readlines():
                    data.append(json.loads(line))

                return data

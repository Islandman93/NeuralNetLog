import pickle
import json
import os
from ..util import to_JSON


def load_logs(log_dir: str):
    events = load_log(log_dir, 'events')
    stats = load_log(log_dir, 'stats')
    checkpoints = load_log(log_dir, 'checkpoints')

    return events, stats, checkpoints


def load_log(log_dir: str, file_name: str):
    if os.path.isfile(log_dir + file_name + '.json') or os.path.isfile(log_dir + file_name + '.pkl'):
        # if pickle
        if os.path.isfile(log_dir + file_name + '.pkl'):
            with open(log_dir + file_name + '.pkl', 'rb') as in_file:
                # pickle files are written with append so we need to continously read until empty
                # http://stackoverflow.com/questions/12761991/how-to-use-append-with-pickle-in-python
                data = []
                while True:
                    try:
                        data.append(to_JSON(pickle.load(in_file)))
                    except EOFError:
                        break

                return data
        else:  # json
            with open(log_dir + file_name + '.json', 'r') as in_file:
                data = []
                # json are appended by line
                for line in in_file.readlines():
                    data.append(json.loads(line))

                return data
    else:
        raise FileNotFoundError('{0} does not exist in path {1}'.format(file_name, log_dir))

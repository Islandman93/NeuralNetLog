from typing import Union, List
import logging
import os
import json
import pickle
import numpy as np
from ..util import to_JSON
from .checkpoints import get_layer_name_from_ind
Number = Union[int, float]


class Stats:
    def __init__(self, out_dir: str, json: bool=False):
        self.json = json
        self.out_dir = out_dir
        self.file_path = out_dir + 'stats.json' if json else out_dir + 'stats.pkl'

        # check if log file already exists if so warn
        if os.path.exists(self.file_path) and os.path.isfile(self.file_path):
            logging.getLogger(__name__).warning('Stat file already exists, new stats will be appended to this file {0}'
                                                .format(self.file_path))
        else:
            os.makedirs(out_dir, exist_ok=True)

    def add_stats(self, step: Number, layer_weights: List[np.ndarray], layer_names: List[str]=None):
        stats = generate_stats(layer_weights, layer_names)
        with self._open_log_file() as out_file:
            if self.json:
                jsonified_values = to_JSON(stats)
                out_file.write(json.dumps({'step': step, 'values': jsonified_values}) + '\n')
            else:
                pickle.dump({'step': step, 'values': stats}, out_file)

    def _open_log_file(self):
        if self.json:
            return open(self.file_path, 'a')
        else:
            return open(self.file_path, 'ab')


def generate_stats(layer_weights: List[np.array], layer_names: List[str]=None):
    stats = []
    for layer_ind, weights in enumerate(layer_weights):
        # get descriptive information name / shape
        if layer_names is not None:
            name = layer_names[layer_ind]
        else:
            name = get_layer_name_from_ind(layer_ind)
        l2norm = np.sqrt(np.mean(np.power(weights, 2)))
        stat = {'layerName': name, 'statName': 'l2norm', 'value': l2norm}
        stats.append(stat)
    return stats

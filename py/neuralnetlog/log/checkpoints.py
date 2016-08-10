from typing import Union, List
import logging
import os
import json
import pickle
import numpy as np
from ..util import to_JSON
Number = Union[int, float]


class Checkpoints:
    def __init__(self, out_dir: str, layer_names: List[str]=None, json: bool=False):
        self.json = json
        self.out_dir = out_dir
        self.file_path = self.file_path = out_dir + 'checkpoints.json' if json else out_dir + 'checkpoints.pkl'
        self.layer_names = layer_names

        # check if log file already exists if so warn
        if os.path.exists(self.file_path) and os.path.isfile(self.file_path):
            logging.getLogger(__name__).warning('Checkpoint file already exists, new checkpoints will be appended to this file {0}'
                                                .format(self.file_path))
        else:
            os.makedirs(out_dir, exist_ok=True)

    def add_checkpoint(self, step: Number, layer_weights: List[np.ndarray]):
        weight_dic = self.create_weight_dictionary(layer_weights, self.layer_names)
        with self._open_log_file() as out_file:
            if self.json:
                jsonified_values = to_JSON(weight_dic)
                out_file.write(json.dumps({'step': step, 'values': jsonified_values}) + '\n')
            else:
                pickle.dump({'step': step, 'values': weight_dic}, out_file)

    def _open_log_file(self):
        if self.json:
            return open(self.file_path, 'a')
        else:
            return open(self.file_path, 'ab')

    @staticmethod
    def create_weight_dictionary(layer_weights: List[np.ndarray], layer_names: List[str]=None):
        weight_dic = {}
        for layer_ind, weight in enumerate(layer_weights):
            # get descriptive information name / shape
            if layer_names is not None:
                name = layer_names[layer_ind]
            else:
                name = get_layer_name_from_ind(layer_ind)
            shape = weight.shape
            weight_dic[name] = {'shape': shape, 'values': weight}
        return weight_dic


def get_layer_name_from_ind(ind: int):
    # assume each layer has it's own weight and bias
    layer_ind = int(np.ceil(ind / 2) + 1)
    # assume weight comes first so mod 2 == weight
    if ind % 2 == 0:
        layer_type = 'w'
    else:
        layer_type = 'b'
    return layer_type + str(layer_ind)

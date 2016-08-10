from typing import Union, Dict
import logging
import os
import json
import pickle
from ..util import to_JSON
Number = Union[int, float]


class Events:
    def __init__(self, out_dir: str, json: bool=False):
        self.json = json
        self.out_dir = out_dir
        self.file_path = out_dir + 'events.json' if json else out_dir + 'events.pkl'

        # check if log file already exists if so warn
        if os.path.exists(self.file_path) and os.path.isfile(self.file_path):
            logging.getLogger(__name__).warning('Event file already exists, new events will be appended to this file {0}'
                                                .format(self.file_path))
        else:
            os.makedirs(out_dir, exist_ok=True)

    def add_event(self, step: Number, values: Dict[str, Number]):
        with self._open_log_file() as out_file:
            if self.json:
                jsonified_values = to_JSON(values)
                out_file.write(json.dumps({'step': step, 'values': jsonified_values}) + '\n')
            else:
                pickle.dump({'step': step, 'values': values}, out_file)

    def _open_log_file(self):
        if self.json:
            return open(self.file_path, 'a')
        else:
            return open(self.file_path, 'ab')

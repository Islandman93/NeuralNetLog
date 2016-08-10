import numpy as np
from collections import OrderedDict


def to_JSON(obj):
    # http://stackoverflow.com/questions/3488934/simplejson-and-numpy-array
    """
    If input object is a ndarray it will be converted into a list
    If object is numpy scalar type will be converted to pythonic type
    """
    if isinstance(obj, tuple) or isinstance(obj, list):
        if isinstance(obj, tuple):
            obj = list(obj)
        for ind, non_json in enumerate(obj):
            obj[ind] = to_JSON(non_json)
    if isinstance(obj, dict) or isinstance(obj, OrderedDict):
        for key, value in obj.items():
            obj[key] = to_JSON(obj[key])
    if isinstance(obj, np.ndarray):
        # if size is 1 assume it's a scalar
        if obj.size == 1:
            return obj.item()
        return obj.tolist()
    # catch for scalars
    if isinstance(obj, np.generic):
        return obj.item()
    return obj

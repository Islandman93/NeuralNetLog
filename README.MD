NeuralNetLog
===============
NeuralNetLog is a JavaScript (TypeScript) and Python package that offers an easy API to view what's going on when training a neural network. In fact, the API is meant to be so general that you could use it with any machine learning technique. 

It's broken down into Events, Stats, and Checkpoints.

Installation
============
To install the Python module:
```
cd py
python setup.py install  # or develop if you want to change the python code
```
Simple Usage
============
The examples directory under py/ shows how to use the python API, then run the Python server with:
```
python python_server.py /path/to/log/dir
```


More Info
=========
Events
------
Anything can be an event, as long as it has a unique name and numeric value it can be shown. Common events include: Loss, Accuracy, Mean activations of layers, etc.

Stats
-----
Stats are specific to neural networks, given a list of numpy arrays (the layer weights). Stats (like l2_norm) will be automatically generated for each layer. 

Checkpoints
-----------
Again network specific, checkpoints takes the networks layer weights and tries to intelligently display the weights as an image. (Works for Conv2d filters, 2d and 1d weights/biases).

JavaScript
==========
The JavaScript (TypeScript) folder is used for all the frontend display. It uses TypeScript, ReactJs, and Gulp.

Python
======
The Python package contains the API for saving events, stats, and checkpoints (either as pickle or JSON). And contains a python_server.py To run a python server that the JavasScript side queries for data.

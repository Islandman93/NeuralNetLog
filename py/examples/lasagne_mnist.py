import datetime
import lasagne
import theano
import theano.tensor as T
import numpy as np
from load_mnist import load_dataset
from neuralnetlog.log.stats import Stats
from neuralnetlog.log.events import Events
from neuralnetlog.log.checkpoints import Checkpoints


X_train, y_train, X_val, y_val, X_test, y_test = load_dataset()

# generate simple network
l_in = lasagne.layers.InputLayer((None, 1, 28, 28))
l_hid1 = lasagne.layers.conv.Conv2DLayer(l_in, 16, [5, 5])
l_out = lasagne.layers.DenseLayer(l_hid1, 10, nonlinearity=lasagne.nonlinearities.softmax)

# get network output and hidden output given l_in.input_var
hidden_out, network_out = lasagne.layers.get_output([l_hid1, l_out])

# calculate loss and updates
truth = T.ivector()
loss = T.mean(lasagne.objectives.categorical_crossentropy(network_out, truth))
network_params = lasagne.layers.get_all_params(l_out)
network_updates = lasagne.updates.rmsprop(loss, network_params, 0.01)
train = theano.function([l_in.input_var, truth], outputs=[loss, T.mean(hidden_out)], updates=network_updates)
get_output = theano.function([l_in.input_var], outputs=network_out)

# setup events & stats
# I choose to save these as json because I know they will be small files
# But be warned, pickle is much more effecient as far as saving space but then the files are
# no longer human readable which is not helpful for an example.
OUTPUT_DIR = 'runs/{:%Y-%b-%d-%H-%M-%S}/'.format(datetime.datetime.now())
events = Events(OUTPUT_DIR, json=True)
stats = Stats(OUTPUT_DIR, json=True)
checkpoints = Checkpoints(OUTPUT_DIR)  # json checkpoints are really even too large for this simple network

# output initial network parameter stats
stats.add_stats(0, lasagne.layers.get_all_param_values(l_out))

# minibatch setup
mb_size = 500  # make sure it is a factor of len of mnist train_x
num_minibatches = X_train.shape[0] // mb_size
for epoch in range(3):
    for example_ind in range(num_minibatches):
        print('Epoch: {0}. Minibatch {1}/{2}'.format(epoch, example_ind, num_minibatches))
        mb_start = example_ind * mb_size
        mb_end = mb_start + mb_size
        mb_slice = slice(mb_start, mb_end)
        example_x = X_train[mb_slice]
        example_y = y_train[mb_slice]
        loss, mean_activation = train(example_x, example_y)
        # calculate the epoch fraction for the current minibatch
        step = epoch + (example_ind / num_minibatches)
        # anything you can think of can go in the event values as long as it's a number
        # I use mean activation of the hidden layer here as an example
        events.add_event(step, {'loss': loss, 'l_hid1_mean_act': mean_activation})
        # I choose not to output accuracy here as it takes a while to compute and would slow down training
    # epoch end, output accuracy
    pred = np.argmax(get_output(X_test), axis=1)
    # accuracy is sum of equal divided by number
    accuracy = np.sum(pred == y_test) / y_test.shape[0]
    events.add_event(epoch + 1, {'accuracy': accuracy})  # add 1 because the epoch is finished
    # we could also add things like train / valid / test accuracy here

    # end of epoch output network parameter stats, this can also be done at any time step
    stats.add_stats(epoch + 1, lasagne.layers.get_all_param_values(l_out))

    # output network weights, this can also be done at any time step
    checkpoints.add_checkpoint(epoch + 1, lasagne.layers.get_all_param_values(l_out))

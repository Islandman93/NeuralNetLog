# setup code taken from https://www.jeffknupp.com/blog/2013/08/16/open-sourcing-a-python-project-the-right-way/

from setuptools import setup
import io
import os

here = os.path.abspath(os.path.dirname(__file__))


def read(*filenames, **kwargs):
    encoding = kwargs.get('encoding', 'utf-8')
    sep = kwargs.get('sep', '\n')
    buf = []
    for filename in filenames:
        with io.open(filename, encoding=encoding) as f:
            buf.append(f.read())
    return sep.join(buf)

long_description = read('README.md')

setup(
    name='neuralnetlog',
    version=0.1,
    url='http://github.com/islandman93/neuralnetlog',
    license='MIT License',
    author='IslandMan93',
    author_email='islandman93@gmail.com',
    description='Saves and serves network checkpoints and statistics to a javascript frontend.',
    long_description=long_description,
    packages=['neuralnetlog'],
    include_package_data=True,
    platforms='any',
    classifiers=[
        'Programming Language :: Python',
        'Development Status :: Alpha',
        'Natural Language :: English',
        'Environment :: Machine Learning',
        'Intended Audience :: Developers/Researchers',
        'License :: MIT License',
        'Operating System :: OS Independent',
        ]
)

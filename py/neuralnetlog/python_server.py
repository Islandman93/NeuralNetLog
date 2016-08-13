import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import neuralnetlog.server


class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """ Handle GET Request"""
        path_split = self.path.split('/')
        del path_split[0]  # remove the first '/'

        if path_split[0] == 'stats':
            self.wfile.write(json.dumps(stats).encode())
        elif path_split[0] == 'events':
            self.wfile.write(json.dumps(events).encode())
        elif path_split[0] == 'checkpoints':
            self.wfile.write(json.dumps(checkpoints).encode())

if __name__ == '__main__':
    # dir = 'D:\\_code\\reinforcepy\\examples\\ALE\\novelty'
    dir = 'D:\\_code\\reinforcepy\\examples\\ALE\\DQN_Async'
    os.chdir(dir + '\\saves')

    # load the stats file list
    events, stats, checkpoints = neuralnetlog.server.load_logs()

    # Port on which server will run.
    PORT = 8080
    HTTPDeamon = HTTPServer(('', PORT), HTTPRequestHandler)

    print("Listening at port", PORT)

    try:
        HTTPDeamon.serve_forever()
    except KeyboardInterrupt:
        pass

    HTTPDeamon.server_close()
    print("Server stopped")

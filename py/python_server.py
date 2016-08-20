import sys
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import neuralnetlog.server


class HTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        """ Handle GET Request"""
        path_split = self.path.split('/')
        del path_split[0]  # remove the first '/'

        if path_split[0] == 'stats':
            print('Sending Stats')
            self.wfile.write(json.dumps(stats).encode())
        elif path_split[0] == 'events':
            print('Sending Events')
            self.wfile.write(json.dumps(events).encode())
        elif path_split[0] == 'checkpoints':
            self.wfile.write(json.dumps(checkpoints).encode())

if __name__ == '__main__':
    LOG_DIR = sys.argv[1]

    # load the stats file list
    events, stats, checkpoints = neuralnetlog.server.load_logs(LOG_DIR)

    # Port on which server will run.
    if len(sys.argv) > 2:
        PORT = sys.argv[2]
    else:
        PORT = 8080
    HTTPDeamon = HTTPServer(('', PORT), HTTPRequestHandler)

    print("Listening at port", PORT)

    try:
        HTTPDeamon.serve_forever()
    except KeyboardInterrupt:
        pass

    HTTPDeamon.server_close()
    print("Server stopped")

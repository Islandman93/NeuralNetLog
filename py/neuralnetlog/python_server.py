from http.server import BaseHTTPRequestHandler, HTTPServer
import json
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
    LOG_DIR = 'D:\\_code\\networklog\\py\\examples\\runs\\2016-Aug-20-10-12-16\\'

    # load the stats file list
    events, stats, checkpoints = neuralnetlog.server.load_logs(LOG_DIR)

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

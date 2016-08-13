import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dashboard from './components/Dashboard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// theme provider
// http://www.material-ui.com/#/get-started/usage
const App = () => (
  <MuiThemeProvider>
    <Dashboard />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("dashboard"));

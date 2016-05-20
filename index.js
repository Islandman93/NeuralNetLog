var React = require('react');
var ReactDOM = require('react-dom');
var Dashboard = require('./dashboard.js');

window.renderedDashboard = ReactDOM.render(<Dashboard />, document.getElementById("dashboard"));

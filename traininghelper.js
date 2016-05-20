var d3 = require('d3');
var c3 = require('c3');
var sampling = require('./sampling');
var $ = require('jquery');

module.exports = {loadData, generateLossChart, generateScoreChart};

var maxPoints = 0;

function loadData(callbackLoss, callbackScore){
  // start data get
  $.get("http://localhost:8080/stats/getlist", function(data){
      let dataList = JSON.parse(data);
      maxPoints = Math.round(1000/dataList.length);

      // iterate over data and add to charts
      for(let i = 0; i < dataList.length; i++){
          d3.json("http://localhost:8080/stats/getstat/"+dataList[i], function(error, json){
              if (error) return console.warn(error);
              let mbData = parseMinibatch(json, dataList[i]);
              let scoreData = parseScore(json, dataList[i]);
              let columnXs = {};
              columnXs[dataList[i]] = 'x'+dataList[i];
              callbackLoss(columnXs, mbData);
              callbackScore(columnXs, scoreData);
          });
      }
  });
}

function parseMinibatch(data, key){
    // get x y arrays
    let values = data.filter((x) => x.type === 'Minibatch');
    return parseData(values, key, 'loss');
}

function parseScore(data, key){
    // get x y arrays
    let values = data.filter((x) => x.type === 'Epoch');
    return parseData(values, key, 'Reward');
}

function parseData(values, key, ykey){
    let sampleInd = sampling.resevoirSampleInd(values, maxPoints);
    let sampledValues = sampling.getArrayFromInds(values, sampleInd);
    let y = sampledValues.map((y) => y.values[ykey]);
    let x = sampledValues.map((x) => x.step);
    // unshift to put the name infront
    y.unshift(key);
    x.unshift('x'+key);

    return [x, y];
}

function generateLossChart(node){
    var lossChart = c3.generate({
            bindto: node,
            data: {
                columns: [],
                type: 'scatter'
            },
            zoom: {
                enabled: true,
                rescale: true
            },
        });
    return lossChart
}

function generateScoreChart(node){
    var scoreChart = c3.generate({
            bindto: node,
            data: {
                columns: [],
                type: 'scatter'
            },
            zoom: {
                enabled: true,
                rescale: true
            },
        });
    return scoreChart
}

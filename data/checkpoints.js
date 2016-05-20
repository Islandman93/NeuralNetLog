var d3 = require('d3');
var c3 = require('c3');
var $ = require('jquery');
var nj = require('numjs');

module.exports = {loadCheckpoints, getSortedCheckpoints, getGroupedCheckpoints};
function loadCheckpoints(callback){
  // start data get
  d3.json("http://localhost:8080/checkpoints", function(error, json){
    if (error) callback(console.warn(error));

    let masterData = [];
    let legendNames = [];
    for(let checkpointInd = 0; checkpointInd < json.length; checkpointInd++){
      let checkpoint = json[checkpointInd];

      let data = {};
      data.xstep = checkpoint.epoch;
      for(let statInd = 0; statInd < checkpoint.stats.length; statInd++){
        let stat = checkpoint.stats[statInd];
        let name = '';
        name += stat.type + stat.index + '_' + stat.name;
        legendNames.push(name);
        data[name] = stat.value;
      }
      masterData.push(data);
    }
    // unique legendNames
    // http://stackoverflow.com/questions/13486479/how-to-get-an-array-of-unique-values-from-an-array-containing-duplicates-in-java
    callback(masterData, Array.from(new Set(legendNames)));
  });
}

function getSortedCheckpoints(callback){
  // start data get
  d3.json("http://localhost:8080/checkpoints", function(error, json){
    if (error) callback(console.warn(error));

    callback(json.sort(checkpointCmp));
  });
}

function getGroupedCheckpoints(callback){
  getSortedCheckpoints(_getGroupedCheckpoints(callback));
}

function _getGroupedCheckpoints(callback){
  return function(sortedCheckpoints){
    // convert ranges into a sorted group 0 through <1, 1 through <2, etc
    let groups = [];
    let lastStep = 0;
    let currentGroup = [];
    for(let i = 0; i < sortedCheckpoints.length; i++){
      let checkpoint = sortedCheckpoints[i];

      // new group
      if(checkpoint.epoch >= lastStep + 1){
        let range = {min: lastStep, max: lastStep+1};
        groups.push({range, checkpoints: currentGroup});
        currentGroup = [];
        lastStep++;
      }
      // else append to current group
      else{
        currentGroup.push(checkpoint);
      }
    }

    callback(groups);
  };
}

function checkpointCmp(chk1, chk2){
  return chk1.epoch - chk2.epoch;
}

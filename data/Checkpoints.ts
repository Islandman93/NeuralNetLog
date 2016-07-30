import * as $ from 'jquery';

// export type Checkpoint = {
//   epoch: number,
//   stats: [],
// }
export function loadCheckpoints(callback){
  // start data get
  $.get("http://localhost:8080/checkpoints", function(json){
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

export function getSortedCheckpoints(callback){
  // start data get
  $.get("http://localhost:8080/checkpoints", function(json){
    callback(json.sort(checkpointCmp));
  });
}

export function getGroupedCheckpoints(callback: (checkpoints: any[]) => void){
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

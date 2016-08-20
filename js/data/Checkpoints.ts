import * as $ from 'jquery';

export type LayerType = {
  shape: number[],
  values: number[]
}
export type Checkpoint = {
  step: number,
  values: {[layerName: string]: LayerType}
}
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

export function getSortedCheckpoints(callback: (checkpoints: Checkpoint[]) => void){
  // start data get
  $.get("http://localhost:8080/checkpoints", function(jsonStr: string){
    let checkpointList: Checkpoint[] = JSON.parse(jsonStr);
    callback(checkpointList.sort(checkpointCmp));
  });
}

export function getGroupedCheckpoints(callback: (checkpoints: GroupedCheckpoints[]) => void){
  getSortedCheckpoints(_getGroupedCheckpoints(callback));
}

type Range = {min: number, max: number};
export type GroupedCheckpoints = {
  range: Range,
  checkpoints: Checkpoint[]
};
function _getGroupedCheckpoints(callback: (checkpoints: GroupedCheckpoints[]) => void){
  return function(sortedCheckpoints: Checkpoint[]){
    // convert ranges into a sorted group 0 through <1, 1 through <2, etc
    let groups: GroupedCheckpoints[] = [];
    let lastStep = 0;
    let currentGroup: Checkpoint[] = [];
    sortedCheckpoints.map((checkpoint) => {
      currentGroup.push(checkpoint);

      // new group
      if(checkpoint.step >= lastStep + 1){
        let range: Range = {min: lastStep, max: lastStep+1};
        groups.push({range, checkpoints: currentGroup});
        currentGroup = [];
        lastStep++;
      }
    });

    callback(groups);
  };
}

function checkpointCmp(chk1: Checkpoint, chk2: Checkpoint){
  return chk1.step - chk2.step;
}

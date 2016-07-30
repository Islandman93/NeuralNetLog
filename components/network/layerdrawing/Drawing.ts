import nj from 'numjs';

export function drawLayer(node, ndArray){
  let arr = nj.array(ndArray);
  // conv filter
  if(arr.shape.length == 4){
      drawConv(node, arr);
  }
  // untied conv bias
  else if (arr.shape.length == 3){
      drawUntiedBias(node, arr);
  }
  // dense
  else if (arr.shape.length == 2){
      drawDense(node, arr);
  }
  // bias
  else if (arr.shape.length == 1){
      drawBias(node, arr);
  }
}

function drawConv(node, arr){
  // try to get good numbers for a grid
  // http://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
  let gridX = 0, gridY = 0;
  let gridXY = Math.sqrt(arr.shape[0]);
  // not a whole number
  if(gridXY % 1 != 0){
    gridX = Math.floor(gridXY);
    gridY = Math.ceil(gridXY);
  }
  else{
    gridX = gridXY;
    gridY = gridXY;
  }
  for (let filterInd = 0; filterInd < arr.shape[0]; filterInd++){
    for (let channelInd = 0; channelInd < arr.shape[1]; channelInd++){
      let img = normalizeImg(arr.pick(filterInd).pick(channelInd));
      let canv = document.createElement('canvas');
      canv.setAttribute('width', Math.pow(img.shape[0], 1.5));
      canv.setAttribute('height', Math.pow(img.shape[1], 1.5));
      canv.getContext("2d").imageSmoothingEnabled = false;
      nj.images.save(img, canv);
      node.appendChild(canv);
    }
    if ((filterInd+1) % gridX == 0) {  // +1 because we don't want to br on first (zero indexed)
      node.appendChild(document.createElement('br'));
    }
  }
}

function drawUntiedBias(node, arr){
  // try to get good numbers for a grid
  // http://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
  let gridX = 0, gridY = 0;
  let gridXY = Math.sqrt(arr.shape[0]);
  // not a whole number
  if(gridXY % 1 != 0){
    gridX = Math.floor(gridXY);
    gridY = Math.ceil(gridXY);
  }
  else{
    gridX = gridXY;
    gridY = gridXY;
  }
  for (let filterInd = 0; filterInd < arr.shape[0]; filterInd++){
    let img = normalizeImg(arr.pick(filterInd));
    let canv = document.createElement('canvas');
    canv.setAttribute('width', img.shape[0] * 2);
    canv.setAttribute('height', img.shape[1] * 2);
    canv.getContext("2d").imageSmoothingEnabled = false;
    nj.images.save(img, canv);
    node.appendChild(canv);
    if ((filterInd+1) % gridX == 0) {  // +1 because we don't want to br on first (zero indexed)
      node.appendChild(document.createElement('br'));
    }
  }
}

function drawDense(node, arr){
    let img = normalizeImg(arr);
    let canv = document.createElement('canvas');
    canv.setAttribute('width', img.shape[0]);
    canv.setAttribute('height', img.shape[1]);
    canv.getContext("2d").imageSmoothingEnabled = false;
    nj.images.save(img, canv);
    node.appendChild(canv);
}

function drawBias(node, arr){
  let div = document.createElement('div');
  div.innerHTML = '' + arr;
  node.appendChild(div);
}

function normalizeImg(img){
    // if min is negative then make lowest value 0
    let min = nj.min(img);
    if(min < 0){
        img = img.subtract(nj.min(img));
    }

    // divide by max to normalize between 0 and 1
    img = img.divide(nj.max(img));
    // multiply by 255
    img = img.multiply(255);
    return img;
}

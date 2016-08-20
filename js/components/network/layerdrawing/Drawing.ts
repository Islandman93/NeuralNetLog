import {LayerType} from '../../../data/Checkpoints';
import nj from 'numjs';

export function drawLayer(node, layer: LayerType){
  // conv filter
  if(layer.shape.length == 4){
      drawConv(node, layer);
  }
  // untied conv bias
  else if (layer.shape.length == 3){
      drawUntiedBias(node, layer);
  }
  // dense
  else if (layer.shape.length == 2){
      drawDense(node, layer);
  }
  // bias
  else if (layer.shape.length == 1){
      drawBias(node, layer);
  }
}

function drawConv(node, layer: LayerType){
  // try to get good numbers for a grid
  // http://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
  let gridX = 0, gridY = 0;
  let gridXY = Math.sqrt(layer.shape[0]);
  // not a whole number
  if(gridXY % 1 != 0){
    gridX = Math.floor(gridXY);
    gridY = Math.ceil(gridXY);
  }
  else{
    gridX = gridXY;
    gridY = gridXY;
  }
  for (let filterInd = 0; filterInd < layer.shape[0]; filterInd++){
    for (let channelInd = 0; channelInd < layer.shape[1]; channelInd++){

      let img = normalizeImg(nj.array(layer.values).pick(filterInd).pick(channelInd));
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

function drawUntiedBias(node, layer){
  // try to get good numbers for a grid
  // http://stackoverflow.com/questions/2304052/check-if-a-number-has-a-decimal-place-is-a-whole-number
  let gridX = 0, gridY = 0;
  let gridXY = Math.sqrt(layer.shape[0]);
  // not a whole number
  if(gridXY % 1 != 0){
    gridX = Math.floor(gridXY);
    gridY = Math.ceil(gridXY);
  }
  else{
    gridX = gridXY;
    gridY = gridXY;
  }
  for (let filterInd = 0; filterInd < layer.shape[0]; filterInd++){
    let img = normalizeImg(nj.array(layer.values).pick(filterInd));
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

function drawDense(node, layer){
    let img = normalizeImg(nj.array(layer.values));
    let canv = document.createElement('canvas');
    canv.setAttribute('width', img.shape[0]);
    canv.setAttribute('height', img.shape[1]);
    canv.getContext("2d").imageSmoothingEnabled = false;
    nj.images.save(img, canv);
    node.appendChild(canv);
}

function drawBias(node, layer){
  let div = document.createElement('div');
  div.innerHTML = '' + layer.values;
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

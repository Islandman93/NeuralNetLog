var d3 = require('d3');
var c3 = require('c3');
var $ = require('jquery');
var nj = require('numjs');

module.exports = {getList, getParm, generateChart};
function getList(callback){
  // start data get
  $.get("http://localhost:8080/parms/getlist", function(data){
    let dataList = JSON.parse(data);
    callback(dataList);
  });
}

function getParm(parmName, callback){
  d3.json("http://localhost:8080/parms/getparm/"+parmName, function(error, json){
    if (error) callback(console.warn(error));

    // loop over weight / biases
    let layers = [];
    let layerInd = 0;
    for(let wbind = 0; wbind < json.length; wbind++){
        let arr = nj.array(json[wbind]);
        let name = '';
        if(wbind % 2 == 0){
            name += 'w';
            layerInd++;
        }
        else{
            name += 'b';
        }
        name += layerInd;
        layers.push({name, values: arr});
    }
    callback(layers);
  });
}

function generateChart(node){
    var chart = c3.generate({
            bindto: node,
            data: {
                columns: [],
                // onmouseover: displayTooltip,
                // onmouseout: removeTooltip,
            },
            zoom: {
                enabled: true,
                rescale: true
            },
        });
    return chart;
}

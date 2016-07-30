import * as $ from 'jquery';
import * as nj from 'numjs';
import * as c3 from 'c3';

export type ParameterList = string[];
export function getList(callback: (parameterList: ParameterList) => void){
  // start data get
  $.get("http://localhost:8080/parms/getlist", function(data: ParameterList){
    callback(data);
  });
}

export type ParameterType = {name: string, values: any}[];
export function getParm(parmName: string, callback: (layers: ParameterType) => void){
  $.get("http://localhost:8080/parms/getparm/"+parmName, function(json){
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

export function generateChart(node): c3.ChartAPI{
    let chart = c3.generate({
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

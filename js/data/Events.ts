import * as c3 from 'c3';
import * as $ from 'jquery';
import * as _ from 'lodash';

export type EventData = {[key: string]: c3.PrimitiveArray};
export type EventXs = {[key: string]: string};
type CallbackFnType = (xs: EventXs, data: EventData) => void;
export function loadData(callback: CallbackFnType){
  // start data get
  $.get("http://localhost:8080/events/", function(dataString){
    let data: any = JSON.parse(dataString);
    // store individual value keys and their x steps
    let chartData: EventData = {};
    let xs: EventXs = {};
    // iterate over each event
    data.map((row) => {
      let step = row.step;
      // iterate over each event in values
      _.forOwn(row.values, (value: number, key: string) => {
        // if new type of event, create new obj for key
        if (!_.has(chartData, key)){
          chartData[key] = [key];
          chartData[key + '_x'] = [key + '_x'];
          xs[key] = key + '_x';
        }
        chartData[key].push(value);
        chartData[key + '_x'].push(step);
      });
    });
    callback(xs, chartData);
  });
}

export function generateChart(node){
  let chart = c3.generate(
  {
    bindto: node,
    data: {
      columns: []
    },
    zoom: {
      enabled: true,
      rescale: true
    },
  });
  return chart;
}

import * as $ from 'jquery';
import * as c3 from 'c3';
import * as _ from 'lodash';

export type EventData = { [key: string]: c3.PrimitiveArray };
export type EventXs = { [key: string]: string };
type CallbackFnType = (xs: EventXs, data: EventData) => void;
type Stat = {statName: string, layerName: string, value: number};
type PythonData = {step: number, values: Stat[]};
export function loadData(callback: CallbackFnType) {
  // start data get
  $.get("http://localhost:8080/stats/", function(dataString) {
    let data: PythonData[] = JSON.parse(dataString);
    // store individual value keys and their x steps
    let chartData: EventData = {};
    let xs: EventXs = {};
    // iterate over each event
    data.map((row) => {
      let step = row.step;
      // iterate over each stat in values
      row.values.map((value) => {
        let key = value.layerName + '_' + value.statName;

        // if new stat, create new obj for key
        if (!_.has(chartData, key)) {
          chartData[key] = [key];
          chartData[key + '_x'] = [key + '_x'];
          xs[key] = key + '_x';
        }
        chartData[key].push(value.value);
        chartData[key + '_x'].push(step);
      });
    });
    callback(xs, chartData);
  });
}

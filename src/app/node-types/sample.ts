import {Observable} from "rxjs/Rx";
import {RxNode} from "./rxNode";

export class Sample extends RxNode {
  protected static title = "Sample";
  protected static link = "http://reactivex.io/documentation/operators/sample.html";
  protected static desc = "emit the most recent items emitted by an Observable within periodic time intervals";
  protected static maxInput = 1;
  protected static minInput = 1;

  protected static propertiesType = [{name:"periodicTimeIntervals",type: "number"}];

  public runner = ({}) => {
    return this.graphInputs[0].sample(this.properties.periodicTimeIntervals);
  };
  public toString = ({}) => {
    return '.sample(' + this.properties.periodicTimeIntervals + '))';
  };


  public properties = {
    periodicTimeIntervals: 1000
  };
  public graphInputs = [];
}

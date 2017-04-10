import {Observable} from "rxjs";
import {RxNode} from "./rxNode";
export class GroupBy extends RxNode {
  protected static title = "GroupBy";
  protected static link = "http://reactivex.io/documentation/operators/groupBy.html";
  protected static desc = "divide an Observable into a set of Observables that each emit a different subset of items from the original Observable";
  protected static maxInput = 1;
  protected static minInput = 1;

  protected static propertiesType = [
    {
      name: "fi1",
      type: 'function',
      desc: 'a function that accepts an item from the source Observable and returns its key'
      ,
      types: [
        {
          name: "getCode", func: (x) => {
          return x.code;
        }, text: "(x)=>{return x.code;}"
        },
        {
          name: "getX", func: (x) => {
          return x.x;
        }, text: "(x)=>{return x.x;}"
        },
      ]
    },
    {
      name: "fi2", type: 'function',
      desc: 'a function that accepts an item from the source Observable and returns an item to be emitted in its place by one of the resulting Observables',
      types: [
        {
          name: "getCode", func: (x) => {
          return x.code;
        }, text: "(x)=>{return x.code;}"
        },
        {
          name: "getX", func: (x) => {
          return x.x;
        }, text: "(x)=>{return x.x;}"
        },
      ]
    },
    {
      name: "fi3", type: 'function',
      desc: 'a function used to compare two keys for identity (that is, whether items with two keys should be emitted on the same Observable)',
      types: [
        {
          name: "timeout", func: (x) => {
          return Observable.timer(2000);
        }, text: "(x)=>{return x.code;}"
        },
        {
          name: "nothing", func: (x) => {
          return x;
        }, text: "(x)=>{return x;}"
        },
      ]
    },
  ];

  public runner = () => {
    return this.graphInputs[0].map(GroupBy.propertiesType[0].types[this.properties.fi1].func, GroupBy.propertiesType[1].types[this.properties.fi2].func);
  };
  public toString = () => {
    return '.map(' + GroupBy.propertiesType[0].types[this.properties.fi1].text + ', ' + GroupBy.propertiesType[0].types[this.properties.fi1].text + ')';
  };


  public properties = {
    fi1: 0,
    fi2: 0,
    fi3: 0,
  };
  public graphInputs = [];
}

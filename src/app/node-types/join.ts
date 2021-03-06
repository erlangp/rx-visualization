import {RxNode} from './rxNode';
import {PropertyType} from './property-type';
import {PropertyTypeEnum} from './propertyType.enum';
import {SampleFunctions} from './sample-functions';
import {forkJoin, of} from 'rxjs';

export class Join extends RxNode {
  protected static title = 'forkJoin';
  protected static desc = 'combine items emitted by two Observables whenever an item from one Observable is emitted ' +
    'during a time window defined according to an item emitted by the other Observable';
  protected static maxInput = 2;
  protected static minInput = 2;

  protected static propertiesType = new PropertyType('object', PropertyTypeEnum.Object, [
    new PropertyType('ObKey', PropertyTypeEnum.Method, [
      SampleFunctions.TIMEOUT0,
      SampleFunctions.TIMEOUT,
    ], 'a function that accepts an item from the source Observable and returns an Observable whose ' +
      'lifespan governs the duration during which that item will combine with items from the second Observable'),
    new PropertyType('ObKey', PropertyTypeEnum.Method, [
      SampleFunctions.TIMEOUT0,
      SampleFunctions.TIMEOUT,
    ], 'a function that accepts an item from the second Observable and returns an Observable whose lifespan ' +
      'governs the duration during which that item will combine with items from the first Observable'),
    new PropertyType('ObKey', PropertyTypeEnum.Method, [
      SampleFunctions.XplusY,
    ], 'a function that accepts an item from the first Observable and an item from the second Observable and ' +
      'returns an item to be emitted by the Observable returned from join'),
  ], '');

  public properties = {
    fi1: 0,
    fi2: 0,
    fi3: 0,
  };
  public graphInputs = [];

  public runner = () => {
    return this.graphInputs[0].pipe(forkJoin(
      this.graphInputs[1].observable/* the second observable connected to this block */,
      Join.propertiesType.params[this.properties.fi1].func,
      Join.propertiesType[1].types[this.properties.fi2].func,
      Join.propertiesType[2].types[this.properties.fi3].func,
    ));
  }
  public toString = ({}) => {
    return '.pipe(forkJoin(' + this.graphInputs[1].node.data.toString()
      + ', ' + Join.propertiesType[1].types[this.properties.fi3].text
      + ', ' + Join.propertiesType[2].types[this.properties.fi3].text
      + ', ' + Join.propertiesType[3].types[this.properties.fi3].text
      + ')';
  }
}

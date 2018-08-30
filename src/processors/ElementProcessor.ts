import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";

export default interface ElementProcessor {
  readonly attributeProcessors: AttributeProcessor[]
  accept(element: Element): boolean
  process(element: Element, context: EngineContext): [string[], string[]] 
}
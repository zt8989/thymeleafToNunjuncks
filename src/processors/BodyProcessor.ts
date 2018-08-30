import AttributeProcessor from "./AttributeProcessor";
import DefaultProcessor from "./DefaultProcessor";
import { EngineContext } from "..";

export default class BodyProcessor extends DefaultProcessor {
  constructor(attributeProcessors: AttributeProcessor[]){
    super(attributeProcessors) 
  }

  accept(element: Element): boolean {
    return element.tagName === 'BODY'
  }
  
  process(element: Element, context: EngineContext): [string[], string[]] {
    if(context.extend){
      return [[], []]
    }
    return super.process(element, context)
  }
}
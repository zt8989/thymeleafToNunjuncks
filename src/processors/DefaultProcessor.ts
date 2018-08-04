import ElementProcessor from "./ElementProcessor";
import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";

export default class DefaultProcessor implements ElementProcessor {
  attributeProcessors: AttributeProcessor[];

  constructor(attributeProcessors: AttributeProcessor[]){
    this.attributeProcessors = attributeProcessors
  }

  accept(element: Element): boolean {
    return true
  }  
  
  process(element: Element, context: any): string[] {
    for(let processor of this.attributeProcessors){
      if(processor.accept(element)){
        const result = processor.process(element, context)
      }
    }

    return getElementStringWithoutChildren(element)
  }
}
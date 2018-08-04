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
  
  process(element: Element, context: any): [string[], string[]] {
    const htmlData:[string[], string[]] = [[] , []]
    for(let processor of this.attributeProcessors){
      if(processor.accept(element)){
        const result = processor.process(element, context)
        if(result){
          htmlData[0].push(result[0])
          htmlData[1].push(result[1])
        }
      }
    }

    const elementData  = getElementStringWithoutChildren(element)
    htmlData[0].push(elementData[0])
    htmlData[1].push(elementData[1])
    return [htmlData[0], htmlData[1].reverse()]
  }
}
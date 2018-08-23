import AttributeProcessor from "./AttributeProcessor";
import DefaultProcessor from "./DefaultProcessor";

export default class BlockProcessor extends DefaultProcessor{
  constructor(attributeProcessors: AttributeProcessor[]){
    super(attributeProcessors)
  }

  accept(element: Element): boolean {
    return element.tagName === "TH:BLOCK"
  }

  getElementStringWithoutChildren(element: Element): [string, string]{
    return ['','']
  }
  
  process(element: Element, context: any): [string[], string[]] {
    return super.process(element, context)
  }
}
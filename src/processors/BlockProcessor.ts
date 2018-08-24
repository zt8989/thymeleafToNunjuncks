import AttributeProcessor from "./AttributeProcessor";
import DefaultProcessor from "./DefaultProcessor";

export default class BlockProcessor extends DefaultProcessor{
  constructor(attributeProcessors: AttributeProcessor[]){
    super(attributeProcessors)
  }

  accept(element: Element): boolean {
    return element.tagName === "TH:BLOCK" 
      || element.hasAttribute('th:replace')
      || element.hasAttribute('layout:decorator')
  }

  getElementStringWithoutChildren(element: Element): [string, string]{
    return null
  }
  
  process(element: Element, context: any): [string[], string[]] {
    return super.process(element, context)
  }
}
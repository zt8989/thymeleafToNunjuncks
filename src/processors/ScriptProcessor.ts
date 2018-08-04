import ElementProcessor from "./ElementProcessor";
import AttributeProcessor from "./AttributeProcessor";

export default class SingleElementProcessor implements ElementProcessor {
  attributeProcessors: AttributeProcessor[];

  constructor(attributeProcessors: AttributeProcessor[]){
    this.attributeProcessors = attributeProcessors
  }

  accept(element: Element): boolean {
    return element.children.length === 0
  }  
  
  process(element: Element, context: any): string[] {
    return [element.outerHTML, ""]
  }
}
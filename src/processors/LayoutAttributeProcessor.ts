import AttributeProcessor from "./AttributeProcessor";

export default class FragmentAttributeProcessor implements AttributeProcessor{
  attribute: string = "layout:decorator";  
  
  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }
  process(element: Element, context: any): [string, string] {
    let value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    return [`{% extends '${value}' %}`, ``]
  }
}
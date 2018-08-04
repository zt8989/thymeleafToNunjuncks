import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";

export default class TextAttributeProcessor implements AttributeProcessor{
  attribute = "th:text"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    element.textContent = `{{ ${value} }}`
  }
}
import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";
import ParserFactory from '../parser/ParserFactory'

export default class TextAttributeProcessor implements AttributeProcessor{
  attribute = "th:text"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    const parsed = ParserFactory.parse(value)
    element.removeAttribute(this.attribute)
    element.textContent = `{{ ${parsed} }}`
  }
}
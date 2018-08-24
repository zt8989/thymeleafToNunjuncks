import AttributeProcessor from "./AttributeProcessor";
import ParserFactory from '../parser/ParserFactory'

export default class IfAttributeProcessor implements AttributeProcessor{
  attribute = "th:if"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    const parsed = ParserFactory.parse(value)
    element.removeAttribute(this.attribute)
    return [`{% if ${parsed} %}`, `{% endif %}`]
  }
}
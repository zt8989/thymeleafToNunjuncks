import AttributeProcessor from "./AttributeProcessor";

export default class IfAttributeProcessor implements AttributeProcessor{
  attribute = "th:if"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    return [`{% if ${value} %}`, `{% endif %}`]
  }
}
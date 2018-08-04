import AttributeProcessor from "./AttributeProcessor";

export default class IfAttributeProcessor implements AttributeProcessor{
  attribute = "th:block"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): string[] {
    const value = element.getAttribute(this.attribute)
    return [`{% if ${value} %}`, `{% endif %}`]
  }
}
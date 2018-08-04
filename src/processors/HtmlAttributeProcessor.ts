import AttributeProcessor from "./AttributeProcessor";

export default class HTMLAttributeProcessor implements AttributeProcessor{
  attribute: string
  fullAttribute: string

  constructor(attribute: string, prefix = "th"){
    this.attribute = attribute
    this.fullAttribute = prefix + ":" + attribute
  }

  accept(element: Element): boolean {
    return element.hasAttribute(this.fullAttribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.fullAttribute)
    element.removeAttribute(this.fullAttribute)
    element.setAttribute(this.attribute, `{{ ${value} }}`)
  }
}
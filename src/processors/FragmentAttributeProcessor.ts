import AttributeProcessor from "./AttributeProcessor";

export default class FragmentAttributeProcessor implements AttributeProcessor{
  attribute: string = "layout:fragment";  
  
  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }
  process(element: Element, context: any): string[] {
    let value = element.getAttribute(this.attribute)
    return [`{% block ${value} %}`, `{% endblock %}`]
  }
}
import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";

export default class FragmentAttributeProcessor implements AttributeProcessor{
  attribute: string = "layout:fragment";  
  
  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }
  process(element: Element, context: EngineContext): [string, string] {
    let value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    return [`{% block ${value} %}`, `{% endblock %}`]
  }
}
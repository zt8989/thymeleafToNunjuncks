import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";

export default class FragmentAttributeProcessor implements AttributeProcessor{
  attribute: string = "th:replace";  
  
  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }
  process(element: Element, context: EngineContext): [string, string] {
    let value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    value = value.split('::')[0].trim()
    return [`{% include '${value}.${context.engine.options.extension}' %}`, '']
  }
}
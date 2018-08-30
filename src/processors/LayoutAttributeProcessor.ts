import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";

export default class FragmentAttributeProcessor implements AttributeProcessor{
  attribute: string = "layout:decorator";  
  
  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }
  process(element: Element, context: EngineContext): [string, string] {
    let value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    context.extend = true
    return [`{% extends '${value}.${context.engine.options.extension}' %}`, ``]
  }
}
import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";
import ParserFactory from '../parser/ParserFacade'

export default class IfAttributeProcessor implements AttributeProcessor{
  attribute = "th:if"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    const parsed = context.engine.parser.parse(value)
    element.removeAttribute(this.attribute)
    return [`{% if ${parsed} %}`, `{% endif %}`]
  }
}
import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";
import ParserFactory from '../parser/ParserFacade'
import _ from "lodash";

export default class WitchAttributeProcessor implements AttributeProcessor{
  attribute = "th:each"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    let [key, values] = value.split(":")
    values = context.engine.parser.parse(values.trim())
    return [`{% for ${key.trim()} in ${values} %}`, '{% endfor %}']
  }
}
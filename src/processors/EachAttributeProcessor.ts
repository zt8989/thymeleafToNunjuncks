import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";
import ParserFactory from '../parser/ParserFactory'
import _ from "lodash";

export default class WitchAttributeProcessor implements AttributeProcessor{
  attribute = "th:each"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: any): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    let [key, values] = value.split(":")
    let parser = ParserFactory.createParser()
    values = _.flatten(parser.parse(values.trim())).join(' ') 
    return [`{% for ${key.trim()} in ${values} %}`, '{% endfor %}']
  }
}
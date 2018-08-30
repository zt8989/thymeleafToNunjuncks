import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";
import { getElementStringWithoutChildren } from "./helper";
import ParserFactory from '../parser/ParserFacade'
import _ from "lodash";

export default class WitchAttributeProcessor implements AttributeProcessor{
  attribute = "th:with"

  accept(element: Element): boolean {
    return element.hasAttribute(this.attribute)
  }  
  
  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.attribute)
    element.removeAttribute(this.attribute)
    let values = value.split(",")
    let parser = context.engine.parser
    values = values.map(v => {
        let matches = v.match(/(\w+)=(.+)/)
        if(matches){
            return '{% set ' + matches[1] + '=' + _.flatten(parser.parse(matches[2])).join('') + ' %}' + "\n"
        }
        return v
    })
    return [values.join(''), '']
  }
}
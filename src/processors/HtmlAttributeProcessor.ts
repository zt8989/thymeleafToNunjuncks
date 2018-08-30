import { EngineContext } from './../index';
import AttributeProcessor from "./AttributeProcessor";
import ParserFactory from '../parser/ParserFacade'

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
  
  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.fullAttribute)
    const parsed = context.engine.parser.parse(value)
    element.removeAttribute(this.fullAttribute)
    element.setAttribute(this.attribute, `{{ ${parsed} }}`)
  }
}
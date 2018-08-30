import HTMLAttributeProcessor from "./HtmlAttributeProcessor";
import { EngineContext } from "..";
import ParserFactory from "../parser/ParserFacade";

export default class ObjectAttributeProcessor extends HTMLAttributeProcessor{
  constructor(){
    super("object")
  }

  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.fullAttribute)
    const parsed = context.engine.parser.parse(value)
    element.removeAttribute(this.fullAttribute)
    context.object = parsed
  }
}
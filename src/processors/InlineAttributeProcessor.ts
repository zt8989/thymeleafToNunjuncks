import { EngineContext } from './../index';
import HTMLAttributeProcessor from "./HtmlAttributeProcessor";

export default class InlineAttributeProcessor extends HTMLAttributeProcessor{
  constructor(){
    super("inline")
  }

  process(element: Element, context: EngineContext): [string, string] | void {
    const value = element.getAttribute(this.fullAttribute)
    element.removeAttribute(this.fullAttribute)
    // TODO 解析inline的数据
  }
}
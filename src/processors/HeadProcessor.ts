import AttributeProcessor from "./AttributeProcessor";
import DefaultProcessor from "./DefaultProcessor";
import { EngineContext } from "..";

export default class HeadProcessor extends DefaultProcessor {
  constructor(attributeProcessors: AttributeProcessor[]){
    super(attributeProcessors) 
  }

  accept(element: Element): boolean {
    return element.tagName === 'HEAD'
  }
  
  process(element: Element, context: EngineContext): [string[], string[]] {
    if(context.extend){
      return [['{% block head %}'], ['{% endblock %}']]
    }
    return super.process(element, context)
  }
}
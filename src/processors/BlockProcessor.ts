import Processor from "./Processor";

export default class BlockProcessor implements Processor{
  accept(element: Element): boolean {
    return element.tagName === "TH:BLOCK"
  }
  
  process(element: Element, context: any): string[] {
    let value = element.getAttribute("layout:fragment")
    if(value){
      return [`{% block ${value} %}`, `{% endblock %}`]
    }else{
      console.log(element.outerHTML)
      throw Error('missing attribute layout:fragment')
    }
  }
}
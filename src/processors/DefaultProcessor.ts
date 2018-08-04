import Processor from "./Processor"

export default class DefaultProcessor implements Processor {
  accept(element: Element): boolean {
    return true
  }  
  
  process(element: Element, context: any): string[] {
    const elementString = element.outerHTML.replace(element.innerHTML || "", "")
    const splitIndex = elementString.search(/<\//)
    return [elementString.slice(0, splitIndex), elementString.slice(splitIndex)]
  }
}
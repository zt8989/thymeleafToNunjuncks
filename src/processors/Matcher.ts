import ElementProcessor from "./ElementProcessor";

export default class Matcher {
  match(element: Element, processor: ElementProcessor): boolean{
    return processor.accept(element)
  }
}
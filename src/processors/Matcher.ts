import Processor from "./Processor";

export default class Matcher {
  match(element: Element, processor: Processor): boolean{
    return processor.accept(element)
  }
}
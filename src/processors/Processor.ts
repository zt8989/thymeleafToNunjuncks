export default interface Processor {
  accept(element: Element): boolean
  process(element: Element, context: any): string[] 
}
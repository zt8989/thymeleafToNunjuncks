export default interface AttributeProcessor {
  readonly attribute: string
  accept(element: Element): boolean
  process(element: Element, context: any): [string, string] | void
}
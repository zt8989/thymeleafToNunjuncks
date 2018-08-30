import { EngineContext } from './../index';
export default interface AttributeProcessor {
  readonly attribute: string
  accept(element: Element): boolean
  process(element: Element, context: EngineContext): [string, string] | void
}
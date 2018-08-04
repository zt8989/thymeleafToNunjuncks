import Processor from "./Processor";

export default interface AttributeProcessor extends Processor{
  readonly attribute: string
}
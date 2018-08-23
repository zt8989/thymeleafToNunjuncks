export default class InputBuffer {
  private input:string 
  private index: number
  private stack:number[]

  constructor(input: string, index = 0, stack: number[] = []){
    this.input = input
    this.index = index
    this.stack = stack
  }

  clone(){
    return new InputBuffer(this.input, this.index, this.stack.slice())
  }
}
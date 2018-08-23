import InputBuffer from "./InputBuffer";

export default class Result {
  private input: InputBuffer
  private token: string

  constructor(token:string, input: InputBuffer){
    this.token = token
    this.input = input
  }

  static concat(result1: Result, result2: Result){
    if(result1 === null){
      return result2
    }
    if(result2 === null){
      return result1
    }
    return new Result(result1.token.concat(result2.token), result2.input)
  }
}
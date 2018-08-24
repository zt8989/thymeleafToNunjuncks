import { MatchResult } from "./Match";

export default class InputBuffer {
  private input: string
  private position = 0
  private positionStack: number[] = []

  constructor(input: string){
    this.input = input
  }

  end(){
    return this.input.length === this.position
	}
	
	lookAhead(count: number = 1){
    let remaining = this.input.substring(this.position)
    let matchWhitespace = remaining.match(/^\s+/);
    let leadingWhitespace: string  = ''
    if (matchWhitespace) {
			leadingWhitespace = matchWhitespace[0];
			remaining = remaining.substring(leadingWhitespace.length);
		}
		if(remaining.length < count){
			return null
		}else{
			return remaining.slice(0, count)
		}
	}

  read(pattern: RegExp){
    let remaining = this.input.substring(this.position)
    let matchWhitespace = remaining.match(/^\s+/);
    let leadingWhitespace: string  = ''
    if (matchWhitespace) {
			leadingWhitespace = matchWhitespace[0];
			remaining = remaining.substring(leadingWhitespace.length);
		}
		let result = new RegExp(pattern.source).exec(remaining);
		if (result) {
			let [value] = result;
			if (remaining.startsWith(value)) {
				this.position += (value.length + (leadingWhitespace ? leadingWhitespace.length : 0));
				return result;
			}
		}
		return null;
  }

  markAndReset(func: () => MatchResult){
	this.mark();
		let result = func();
		if (result !== null) {
			this.clear();
			return result;
		}
		this.reset();
		return null;
  }

  clear() {
		let lastPosition = this.positionStack.pop();
		if (lastPosition === undefined) {
			throw new Error('Called clear() but no matching mark()');
		}
	}

  reset() {
		let newPosition = this.positionStack.pop();
		if (newPosition === undefined) {
			throw new Error('Called reset() but no matching mark()');
		}
		this.position = newPosition;
	}

  mark() {
		this.positionStack.push(this.position);
	}
}
import type { TokenType } from './types'

export class Token {
  type: TokenType
  text: string

  constructor(state?: any) {
    this.type = state?.type
    this.text = state?.text
  }
}

export class Tokenizer {
  //
}

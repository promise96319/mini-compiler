export enum TokenType {
  Plus, // +
  Minus, // -
  Star, // *
  Slash, // /

  GE, // >=
  GT, // >
  EQ, // ==
  LE, // <=
  LT, // <

  SemiColon, // ;
  LeftParen, // (
  RightParen, // )

  Assignment, // =

  If,
  Else,

  Const,
  Let,

  Identifier, // 标识符

  IntLiteral, // 数字
}

export class Token {
  type: TokenType
  text: string

  constructor(state?: any) {
    this.type = state?.type
    this.text = state?.text
  }
}

export class Tokenizer {
  tokens: Token[] = []
  pos = 0

  push(token: Token) {
    this.tokens.push(token)
  }

  read() {
    if (this.pos >= 0 && this.pos < this.tokens.length)
      return this.tokens[this.pos]
    return null
  }

  next() {
    if (this.pos < this.tokens.length)
      this.pos += 1

    return this.read()
  }

  prev() {
    if (this.pos >= 0)
      this.pos -= 1

    return this.read()
  }

  setPos(pos: number) {
    if (pos >= 0 && pos < this.tokens.length)
      this.pos = pos
  }
}

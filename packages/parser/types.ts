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
  LeftParen, // ;
  RightParen, // ;

  Assignment, // =

  If,
  Else,

  Const,

  Identifier, // 标识符

}

export interface Token {
  type: TokenType
  text: string
}

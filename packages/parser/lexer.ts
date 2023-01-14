import { Token, TokenType, Tokenizer } from './tokenizer'
import { DfaState } from './state'
import { isBlank, isChar, isDigit } from './util'

export class Lexer {
  tokenizer = new Tokenizer()
  token: Token = new Token()
  tokenText = ''

  initToken = (ch: string): DfaState => {
    // 符合条件，记录下来
    if (this.tokenText.length > 0) {
      this.token.text = this.tokenText
      this.tokenizer.push(this.token)

      this.tokenText = ''
      this.token = new Token()
    }

    let newState = DfaState.Initial

    if (isChar(ch)) {
      if (ch === 'i')
        newState = DfaState.Id_int1
      else
        newState = DfaState.Id

      this.token.type = TokenType.Identifier
      this.tokenText += ch
    }
    else if (isDigit(ch)) {
      newState = DfaState.IntLiteral
      this.token.type = TokenType.IntLiteral
      this.tokenText += ch
    }
    else if (ch === '=') {
      newState = DfaState.Assignment
      this.token.type = TokenType.Assignment
      this.tokenText += ch
    }
    else if (ch === ';') {
      newState = DfaState.SemiColon
      this.token.type = TokenType.SemiColon
      this.tokenText += ch
    }
    else if (ch === '+') {
      newState = DfaState.Plus
      this.token.type = TokenType.Plus
      this.tokenText += ch
    }
    else if (ch === '—') {
      newState = DfaState.Minus
      this.token.type = TokenType.Minus
      this.tokenText += ch
    }
    else if (ch === '*') {
      newState = DfaState.Star
      this.token.type = TokenType.Star
      this.tokenText += ch
    }
    else if (ch === '/') {
      newState = DfaState.Slash
      this.token.type = TokenType.Slash
      this.tokenText += ch
    }

    else {
      newState = DfaState.Initial
    }

    return newState
  }

  tokenize = (code: string): Tokenizer => {
    let index = 0
    let state = DfaState.Initial
    let ch
    while (index < code.length) {
      ch = code[index]
      switch (state) {
        case DfaState.Initial:
          state = this.initToken(ch)
          break

        case DfaState.Id:
          if (isChar(ch) || isDigit(ch))
            this.tokenText += ch
          else
            state = this.initToken(ch)
          break

        case DfaState.Id_int1:
          if (ch === 'n') {
            state = DfaState.Id_int2
            this.tokenText += ch
          }
          else {
            if (isChar(ch) || isDigit(ch))
              this.tokenText += ch
            else
              state = this.initToken(ch)
          }
          break

        case DfaState.Id_int2:
          if (ch === 't') {
            state = DfaState.Id_int3
            this.tokenText += ch
          }
          else {
            if (isChar(ch) || isDigit(ch))
              this.tokenText += ch
            else
              state = this.initToken(ch)
          }
          break

        case DfaState.Id_int3:
          if (isBlank(ch)) {
            this.token.type = TokenType.Let
            state = this.initToken(ch)
          }
          else {
            state = DfaState.Id
            this.tokenText += ch
          }

          break

        case DfaState.Assignment:
        case DfaState.SemiColon:
        case DfaState.Plus:
        case DfaState.Minus:
        case DfaState.Star:
        case DfaState.Slash:
          state = this.initToken(ch)
          break

        case DfaState.IntLiteral:
          if (isDigit(ch))
            this.tokenText += ch
          else
            state = this.initToken(ch)
          break
        default:
          break
      }

      index++
    }

    if (this.tokenText.length > 0)
      this.initToken(ch)

    return this.tokenizer
  }
}

import { Lexer } from './lexer'
import { ASTNode, ASTNodeType } from './ast'
import type { Tokenizer } from './tokenizer'
import { TokenType } from './tokenizer'

export const expression = () => {}

export const additive = (tokenizer: Tokenizer) => {
  return null
}

export const intDeclare = (tokenizer: Tokenizer) => {
  let node: ASTNode | null = null
  let token = tokenizer.read()
  if (token && token.type === TokenType.IntLiteral) {
    token = tokenizer.next()
    console.log('token', token)
    if (token && token.type === TokenType.Identifier) {
      node = new ASTNode(ASTNodeType.Identifier, token.text)
      token = tokenizer.next()
      if (token && token.type === TokenType.Assignment) {
        tokenizer.next()
        const child = additive(tokenizer)
        if (child === null)
          // throw new Error('invalid variable initialization, expecting an expression')
          return
        else
          node.addChild(new ASTNode(ASTNodeType.AssignmentStatement, 'test'))
      }
      else {
        throw new Error('unknown statement')
      }
    }
    else {
      // throw new Error('variable name expected')
    }
  }

  return node
}

export const prog = (tokenizer: Tokenizer) => {
  const root = new ASTNode(ASTNodeType.Program, 'pwc')

  while (tokenizer.read()) {
    const child = intDeclare(tokenizer)

    if (child)
      root.addChild(child)

    //
    tokenizer.next()
  }

  return root
}

export const parse = (str: string) => {
  const tokenizer = new Lexer().tokenize(str)
  return prog(tokenizer)
}

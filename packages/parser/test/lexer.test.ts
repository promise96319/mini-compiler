import { expect, it } from 'vitest'
import { Lexer } from '../lexer'

it('parse str', () => {
  const str = 'int abc = 3 + 3 * 5'
  expect(new Lexer().tokenize(str)).toMatchInlineSnapshot(`
    [
      Token {
        "text": "int",
        "type": 16,
      },
      Token {
        "text": "abc",
        "type": 17,
      },
      Token {
        "text": "=",
        "type": 12,
      },
      Token {
        "text": "3",
        "type": 18,
      },
      Token {
        "text": "+",
        "type": 0,
      },
      Token {
        "text": "3",
        "type": 18,
      },
      Token {
        "text": "*",
        "type": 2,
      },
      Token {
        "text": "5",
        "type": 18,
      },
    ]
  `)
})

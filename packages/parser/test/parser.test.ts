import { expect, it } from 'vitest'
import { parse } from '../index'

it('parse str', () => {
  const str = 'int abc = 3 + 3'

  expect(parse(str)).toMatchInlineSnapshot(`
    ASTNode {
      "children": [],
      "text": "pwc",
      "type": 0,
    }
  `)
})

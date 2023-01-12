export const isChar = (ch: string) => {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
}

export const isDigit = (ch: string) => {
  return ch >= '0' && ch <= '9'
}

export const isBlank = (ch: string) => {
  return ch === ' ' || ch === '\t' || ch === '\n'
}

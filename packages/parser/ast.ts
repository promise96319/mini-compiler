export enum ASTNodeType {
  Program,

  IntDeclaration,
  ExpressionStatement,
  AssignmentStatement,

  Identifier,
  IntLiteral,
}

export class ASTNode {
  type: ASTNodeType
  text: string

  children: ASTNode[] = []
  parent: ASTNode

  constructor(type: ASTNodeType, text: string) {
    this.type = type
    this.text = text
  }

  addChild(child: ASTNode) {
    child.parent = this
    this.children.push(child)
  }
}

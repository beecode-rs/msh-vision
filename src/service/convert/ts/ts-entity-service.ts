import { Entity, EntityType } from 'src/model/entity'
import ts from 'typescript'

export const tsEntityService = {
  extractEntities: ({ node, filePath }: { node: ts.SourceFile; filePath: string }): Entity[] => {
    // const entities: Entity[] = []

    const entities = node.statements
      .map((s) => tsEntityService._returnEntityByKind(ts.SyntaxKind[s.kind], s, filePath))
      .filter(Boolean) as Entity[]

    return entities
  },
  _returnEntityByKind: (kind: string, nodeObject: ts.Node | any, filePath: string): Entity | undefined => {
    switch (kind) {
      case 'ImportDeclaration':
        break
      case 'TypeAliasDeclaration':
        return new Entity({ filePath, name: nodeObject.name.escapedText }, EntityType.TYPE)
    }
    return undefined
  },
}

import { Entity, EntityType } from 'src/model/entity'
import { fileService } from 'src/service/file-service'
import { ClassDeclaration, File, TypeAliasDeclaration } from 'typescript-parser'

export const typescriptParserEntityService = {
  extractEntities: ({ file, filePath }: { file: File; filePath: string }): Entity[] => {
    const entities: Entity[] = []

    entities.push(
      ...file.declarations
        .filter((d: any) => d.isExported)
        .map((d) => new Entity({ filePath, name: d.name }, typescriptParserEntityService.typeFromInstance(d)))
    )

    if (entities.length === 0) entities.push(new Entity({ filePath, name: fileService.fileNameFromPath(filePath) }))
    return entities
  },
  typeFromInstance: (instance: any): EntityType => {
    if (instance instanceof ClassDeclaration) return EntityType.CLASS
    if (instance instanceof TypeAliasDeclaration) return EntityType.TYPE

    // if (instance instanceof AccessorDeclaration) return EntityType.
    // if (instance instanceof ConstructorDeclaration) return EntityType.
    // if (instance instanceof DeclarationInfo) return EntityType.
    // if (instance instanceof DeclarationVisibility) return EntityType.
    // if (instance instanceof DefaultDeclaration) return EntityType.
    // if (instance instanceof EnumDeclaration) return EntityType.
    // if (instance instanceof FunctionDeclaration) return EntityType.
    // if (instance instanceof InterfaceDeclaration) return EntityType.
    // if (instance instanceof MethodDeclaration) return EntityType.
    // if (instance instanceof ModuleDeclaration) return EntityType.
    // if (instance instanceof ParameterDeclaration) return EntityType.
    // if (instance instanceof PropertyDeclaration) return EntityType.
    // if (instance instanceof VariableDeclaration) return EntityType.

    return EntityType.OBJECT
  },
}

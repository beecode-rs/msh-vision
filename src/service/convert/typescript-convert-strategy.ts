import { Entity } from 'src/model/entity'
import { ExportReference } from 'src/model/export-reference'
import { ImportReference } from 'src/model/import-reference'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'
import { File, TypescriptParser } from 'typescript-parser'

const parser = new TypescriptParser()

export class TypescriptConvertStrategy implements ConvertStrategy {
  constructor(protected readonly _filePath: string, protected readonly _rootPath = 'workspace root') {}

  public async convert(): Promise<Entity> {
    const parsedResult = await parser.parseFile(this._filePath, this._rootPath)

    const entity = new Entity()

    entity.importReference.push(...this._extractImports(parsedResult))
    entity.exportReference.push(...this._extractExports(parsedResult))

    return entity
  }

  protected _extractImports(file: File): ImportReference[] {
    const importRef: ImportReference[] = [
      ...file.imports.map(
        (i: any) =>
          new ImportReference(
            i.libraryName,
            i.specifiers.map((s) => s.specifier) // TODO flaten names
          )
      ),
    ]

    return importRef
  }

  protected _extractExports(file: File): ExportReference[] {
    const exportRef: ExportReference[] = [
      ...file.exports.map((i: any) => new ExportReference(i.specifiers.map((s) => s.specifier))),
    ]

    const constExpRef: ExportReference[] = [
      ...file.declarations.filter((d: any) => d.isExported).map((i: any) => new ExportReference(i.name)),
    ]

    return [...exportRef, ...constExpRef]
  }
}

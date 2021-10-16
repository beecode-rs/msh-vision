import { EntityType } from 'src/model/entity'
import ts from 'src/module/ts'
import { TsMetaImport, TsStatementEntity } from 'src/service/convert/ts/statement-entity/ts-statement-entity'

const self = {
  parse: (statement: ts.Statement): TsStatementEntity<TsMetaImport>[] => {
    const names: string[] = []
    const importClause = statement['importClause']
    if (!importClause) return []

    names.push(...self._parseDefaultImport(importClause))
    names.push(...self._parseBindingName(importClause))
    names.push(...self._parseElements(importClause.namedBindings?.elements))

    const path = `${statement['moduleSpecifier'].text}.ts`

    return names.map((name) => ({
      entityType: EntityType.IMPORT,
      statement,
      name,
      meta: {
        path,
      },
    }))
  },
  _parseDefaultImport: (importClause: any): string[] => {
    if (importClause?.name?.escapedText) return [importClause.name.escapedText]
    return []
  },
  _parseBindingName: (importClause: any): string[] => {
    if (importClause?.namedBindings?.name?.escapedText) return [importClause.namedBindings.name.escapedText]
    return []
  },
  _parseElements: (elements: any): string[] => {
    if (!elements || elements.length === 0) return []
    return elements.map((e) => e.name?.escapedText).filter(Boolean)
  },
}

export const tsParserImport = self

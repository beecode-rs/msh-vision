import { ReferenceType } from 'src/enum/reference-type'
import { Reference } from 'src/model/reference'
import ts from 'src/module/ts'
import { TsParserImportParseResult } from 'src/service/parser-ts/parser/ts-parser-import'

const _self = {
  findImportRelations: (
    statement: ts.Statement | ts.VariableDeclaration,
    importParseResults: TsParserImportParseResult[]
  ): Reference[] => {
    if (importParseResults.length === 0) return []
    return importParseResults
      .map((importParseResult) => {
        if (!_self.findIdentifier(importParseResult.name, statement)) return
        return new Reference({
          name: importParseResult.name,
          inProjectPath: importParseResult.inProjectPath,
          type: ReferenceType.ASSOCIATION,
        })
      })
      .filter(Boolean) as Reference[]
  },

  findIdentifier: (identifierName: string, statement: any): boolean => {
    if (statement.kind === ts.SyntaxKind.Identifier && statement.escapedText === identifierName) return true
    if (!_self.isDeclaration(statement) && statement.name?.escapedText === identifierName) return true
    // if (statement.expression?.right && statement.expression.right.escapedText === identifierName) return true
    // if (
    //   (statement.declarations ?? []).length > 0 &&
    //   statement.declarations.find((d) => d.initializer?.escapedText === identifierName)
    // ) {
    //   return true
    // }

    if (
      [ts.SyntaxKind.TypeLiteral, ts.SyntaxKind.TypeReference].includes(statement.kind) &&
      statement.typeName?.escapedText === identifierName
    )
      return true

    if (
      _self.stepIntoNode(identifierName, statement, [
        'body',
        'thenStatement',
        'elseStatement',
        'expression',
        'declarationList',
        'caseBlock',
        'initializer',
        'type',
        'right',
        'tryBlock',
        'catchClause',
        'finallyBlock',
        'block',
      ])
    ) {
      return true
    }
    if (
      _self.stepIntoArray(identifierName, statement, [
        'statements',
        'members',
        'clauses',
        'properties',
        'parameters',
        'declarations',
        'arguments',
        'typeArguments',
      ])
    ) {
      return true
    }

    if (
      [ts.SyntaxKind.CallExpression, ts.SyntaxKind.CallExpression].includes(statement.kind) &&
      _self.stepIntoArray(identifierName, statement, ['arguments'])
    ) {
      return true
    }

    if ([ts.SyntaxKind.Constructor].includes(statement.kind) && _self.stepIntoArray(identifierName, statement, ['parameters'])) {
      return true
    }

    return false
  },

  stepIntoNode: (identifierName: string, statement: any, blockNames: string[]): boolean => {
    return !!blockNames.find((block) => {
      return statement[block] && _self.findIdentifier(identifierName, statement[block])
    })
  },
  stepIntoArray: (identifierName: string, statement: any, blockNames: string[]): boolean => {
    return !!blockNames.find((block) => {
      return (statement[block] ?? []).length > 0 && statement[block].find((b) => _self.findIdentifier(identifierName, b))
    })
  },

  isDeclaration: (statement: any): boolean => {
    return [
      ts.SyntaxKind.MergeDeclarationMarker,
      ts.SyntaxKind.EndOfDeclarationMarker,
      ts.SyntaxKind.PropertyDeclaration,
      ts.SyntaxKind.MethodDeclaration,
      ts.SyntaxKind.VariableDeclaration,
      ts.SyntaxKind.VariableDeclarationList,
      ts.SyntaxKind.FunctionDeclaration,
      ts.SyntaxKind.ClassDeclaration,
      ts.SyntaxKind.InterfaceDeclaration,
      ts.SyntaxKind.TypeAliasDeclaration,
      ts.SyntaxKind.EnumDeclaration,
      ts.SyntaxKind.ModuleDeclaration,
      ts.SyntaxKind.NamespaceExportDeclaration,
      ts.SyntaxKind.ImportEqualsDeclaration,
      ts.SyntaxKind.ImportDeclaration,
      ts.SyntaxKind.ExportDeclaration,
      ts.SyntaxKind.MissingDeclaration,
    ].includes(statement.kind)
  },
}
export const tsParserImportRelations = _self

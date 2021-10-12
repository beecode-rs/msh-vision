import ts from 'typescript'

const node = ts.createSourceFile(
  'x.ts',
  `
    import { Component } from '@angular/core';
    @Component({selector: 'my', template: 'hello me.' })
    export class MyComponent {}`,
  ts.ScriptTarget.Latest
)
// Get import info.
let importDecl
node.forEachChild((child) => {
  if (ts.SyntaxKind[child.kind] === 'ImportDeclaration') {
    importDecl = child
  }
})
const importFiles = importDecl.importClause.namedBindings.elements.map((el) => el.name.escapedText)
const importLib = importDecl.moduleSpecifier.text
// Get decorator info.
var classDecl
node.forEachChild((child) => {
  if (ts.SyntaxKind[child.kind] === 'ClassDeclaration') {
    classDecl = child
  }
})
const decoratorName = classDecl.decorators[0].expression.expression.escapedText
const decoratorParams = classDecl.decorators[0].expression.arguments.reduce((acc, el) => {
  el.properties.forEach((prop) => (acc[prop.name.escapedText] = prop.initializer.text))
  return acc
}, {})
// Get class name
const className = classDecl.name.escapedText
console.log({
  importFiles,
  importLib,
  decoratorName,
  decoratorParams,
  className,
})

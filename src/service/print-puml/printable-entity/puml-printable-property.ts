import { PropertyAccessLevelType } from 'src/enum/property-access-level-type'
import { Property } from 'src/service/model/property'
import { PumlEntity } from 'src/service/print-puml/puml-entity'

export class PumlPrintableProperty extends PumlEntity {
  protected readonly _property: Property

  protected _templateEnd(): string {
    return ''
  }
  protected _templateStart(): string {
    const template = [this._accessLevel(), this._abstractAttribute(), this._propertyName()].filter(Boolean).join(' ')
    return [template, this._addNewRows(this._property.ReturnType)].filter(Boolean).join(': ')
  }

  constructor(params: { property: Property }) {
    const { property } = params
    super()
    this._property = property
  }

  protected _print(): string[] {
    return []
  }

  protected _propertyName(): string {
    const fnProperties = this._property.FunctionParams ? `(${this._addNewRows(this._property.FunctionParams)})` : undefined
    return [this._property.Name, fnProperties].filter(Boolean).join('')
  }

  protected _abstractAttribute(): string {
    return this._property.IsAbstract ? '{abstract}' : ''
  }

  // TODO find more elegant way to do this
  protected _addNewRows(template: string): string {
    if (template.split(';').length === 1 && template.split(',').length === 1) return template
    template = template.split('{').join('{\\n')
    template = template.split('}').join('\\n}')
    template = template.split(';').join(';\\n')
    template = template.split(',').join(',\\n')
    return template
  }

  // TODO add static
  protected _accessLevel(): string {
    switch (this._property.AccessLevel) {
      case PropertyAccessLevelType.PUBLIC:
        return '+'
      case PropertyAccessLevelType.PRIVATE:
        return '-'
      case PropertyAccessLevelType.PROTECTED:
        return '#'
      case PropertyAccessLevelType.NO_MODIFIER:
      default:
        return ''
    }
  }
}

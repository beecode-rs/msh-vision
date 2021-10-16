import { Property, PropertyAccessLevelType } from 'src/model/property'
import { PumlEntity } from 'src/service/print/puml/puml-entity'

export class PumlPrintableProperty extends PumlEntity {
  protected readonly _property: Property

  protected _templateEnd(): string {
    return ''
  }
  protected _templateStart(): string {
    const template = [this._accessLevel(), this._abstractAttribute(), this._propertyName()].filter(Boolean).join(' ')
    return [template, this._property.ReturnType].filter(Boolean).join(': ')
  }

  constructor({ property }: { property: Property }) {
    super()
    this._property = property
  }

  protected _print(): string[] {
    return []
  }

  protected _propertyName(): string {
    const fnProperties = this._property.FunctionParams ? `(${this._property.FunctionParams})` : undefined
    return [this._property.Name, fnProperties].filter(Boolean).join('')
  }

  protected _abstractAttribute(): string {
    return this._property.IsAbstract ? '{abstract}' : ''
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

type TypeString = string
type TypeNumber = number
type TypeObject = object

enum Types {
  STRING = 'string',
  NUMBER = 'number',
  OBJECT = 'object',
  UNDEFINED = 'undefined',
}

// prettier-ignore
export type DynamicType<T extends Types> =
    T extends Types.STRING    ? TypeString
  : T extends Types.NUMBER    ? TypeNumber
  : T extends Types.OBJECT    ? TypeObject
  : T extends Types.UNDEFINED ? undefined
  : never

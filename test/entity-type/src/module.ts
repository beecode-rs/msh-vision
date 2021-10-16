export type ReturnFnType = string

export const fn1 = (param1: string): ReturnFnType => {
  return param1
}

export const fn2 = (param1: string, param2: string): string => {
  return param1 + param2
}

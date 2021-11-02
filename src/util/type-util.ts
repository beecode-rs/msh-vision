export const typeUtil = {
  exhaustiveCheck: (_param: never): Error => {
    return new Error('exhaustiveCheck')
  },
}

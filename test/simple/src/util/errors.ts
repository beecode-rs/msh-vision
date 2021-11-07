export class CustomError extends Error {}

const _self = {
  throwError: (msg: string): void => {
    try {
      console.log(msg)
    } catch (error) {
      if (error instanceof Error) throw new CustomError()
    }
  },
}

export const errors = _self

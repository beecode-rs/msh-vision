import { Executable } from 'src/service/command/executable'

export class Generate implements Executable {
  public execute(): Promise<void> {
    return Promise.resolve(undefined)
  }
}

import { Initiate } from '@beecode/msh-node-app'
import { cliInit } from 'src/use-case/cli-init'

export class ExecArgsAsCommand extends Initiate {
  private readonly __args: string[]
  constructor(args: string[]) {
    super()
    this.__args = args
  }

  get Name(): string {
    return 'ArgsToCommand'
  }
  protected async _initFn(): Promise<void> {
    await cliInit.execArgsAsCommand(this.__args)
  }
  protected async _destroyFn(): Promise<void> {
    // throw new Error('Method not implemented.')
  }
}

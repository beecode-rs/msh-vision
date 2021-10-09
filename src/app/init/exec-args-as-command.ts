import { cliInitUseCase } from '../../use-case/cli-init-use-case'
import { Initiate } from '@beecode/msh-node-app'

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
    await cliInitUseCase.execArgsAsCommand(this.__args)
  }
  protected async _destroyFn(): Promise<void> {
    // throw new Error('Method not implemented.')
  }
}

import { LifeCycle } from '@beecode/msh-node-app'
import { cliInitUseCase } from 'src/use-case/cli-init-use-case'

export class ExecArgsAsCommand extends LifeCycle {
  private readonly __args: string[]

  constructor() {
    super({ name: 'ArgsToCommand' })
    this.__args = process.argv.slice(2)
  }

  protected async _createFn(): Promise<void> {
    await cliInitUseCase.execArgsAsCommand(this.__args)
  }
  protected async _destroyFn(): Promise<void> {
    // throw new Error('Method not implemented.')
  }
}

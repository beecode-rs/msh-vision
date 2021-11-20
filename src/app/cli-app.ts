import { AppFlow } from '@beecode/msh-node-app'
import { ExecArgsAsCommand } from 'src/app/init/exec-args-as-command'

export class CliApp extends AppFlow {
  constructor() {
    super(new ExecArgsAsCommand())
  }
}

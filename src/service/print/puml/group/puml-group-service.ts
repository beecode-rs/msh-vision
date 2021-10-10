import { PumlGroup } from 'src/service/print/puml/group/puml-group'

export const pumlGroupService = {
  printGroups: (groups: { [k: string]: PumlGroup }): string => {
    return Object.values(groups)
      .map((pg) => pg.print())
      .join('\n')
  },
}

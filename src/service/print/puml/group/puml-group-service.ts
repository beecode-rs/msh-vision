import { PumlGroup } from 'src/service/print/puml/group/puml-group'
import { constant } from 'src/util/constant'

export const pumlGroupService = {
  printGroups: (groups: { [k: string]: PumlGroup }): string => {
    return Object.values(groups)
      .map((pg) => pg.print())
      .join(constant.newRow)
  },
}

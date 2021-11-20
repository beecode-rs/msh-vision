import { typeUtil } from '@beecode/msh-node-util/lib/type-util'
import { PumlGroupType } from 'src/enum/puml-group-type'
import { PumlGroup, PumlGroupStrategy } from 'src/service/print-puml/group/puml-group'
import { PumlGroupFictive } from 'src/service/print-puml/group/puml-group-fictive'
import { PumlGroupFolder } from 'src/service/print-puml/group/puml-group-folder'
import { PumlGroupRectangle } from 'src/service/print-puml/group/puml-group-rectangle'

export const pumlGroupService = {
  strategyFromGroup: (group: PumlGroup): PumlGroupStrategy => {
    switch (group.Type) {
      case PumlGroupType.FOLDER:
        return new PumlGroupFolder(group)
      case PumlGroupType.RECTANGLE:
        return new PumlGroupRectangle(group)
      case PumlGroupType.FICTIVE:
        return new PumlGroupFictive()
      default:
        throw typeUtil.exhaustiveCheck('Unknown group strategy', group.Type)
    }
  },
}

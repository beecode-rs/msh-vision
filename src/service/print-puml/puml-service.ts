import { EntityTypes } from 'src/enum/entity-types'
import { Entity } from 'src/model/entity'
import { PumlPrintableClass } from 'src/service/print-puml/printable-entity/puml-printable-class'
import { PumlPrintableEnum } from 'src/service/print-puml/printable-entity/puml-printable-enum'
import { PumlPrintableFile } from 'src/service/print-puml/printable-entity/puml-printable-file'
import { PumlPrintableInterface } from 'src/service/print-puml/printable-entity/puml-printable-interface'
import { PumlPrintableObject } from 'src/service/print-puml/printable-entity/puml-printable-object'
import { PumlPrintableType } from 'src/service/print-puml/printable-entity/puml-printable-type'
import { PumlEntity } from 'src/service/print-puml/puml-entity'
import { logger } from 'src/util/logger'

export const pumlService = {
  printableStrategyFromEntity: (entity: Entity): PumlEntity | undefined => {
    switch (entity.Type) {
      case EntityTypes.CLASS:
        return new PumlPrintableClass({ entity })
      case EntityTypes.FILE:
        return new PumlPrintableFile({ entity })
      case EntityTypes.OBJECT:
        return new PumlPrintableObject({ entity })
      case EntityTypes.INTERFACE:
        return new PumlPrintableInterface({ entity })
      case EntityTypes.TYPE:
        return new PumlPrintableType({ entity })
      case EntityTypes.ENUM:
        return new PumlPrintableEnum({ entity })
      default:
        logger().warn(`Unknown entity type ${entity.constructor.name}`)
      // typeUtil.exhaustiveCheck(entity)
    }
  },
}

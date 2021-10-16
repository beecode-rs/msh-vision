import { Entity } from 'src/model/entity'
import { EntityClass } from 'src/model/entity-class'
import { EntityFile } from 'src/model/entity-file'
import { EntityInterface } from 'src/model/entity-interface'
import { EntityObject } from 'src/model/entity-object'
import { PumlPrintableClass } from 'src/service/print/puml/printable-entity/puml-printable-class'
import { PumlPrintableFile } from 'src/service/print/puml/printable-entity/puml-printable-file'
import { PumlPrintableInterface } from 'src/service/print/puml/printable-entity/puml-printable-interface'
import { PumlPrintableObject } from 'src/service/print/puml/printable-entity/puml-printable-object'
import { PumlEntity } from 'src/service/print/puml/puml-entity'
import { logger } from 'src/util/logger'

export const pumlPrintableEntityService = {
  printableStrategyFromEntity: ({ entity }: { entity: Entity }): PumlEntity | undefined => {
    switch (true) {
      case entity instanceof EntityClass:
        return new PumlPrintableClass({ entity: entity as EntityClass })
      case entity instanceof EntityFile:
        return new PumlPrintableFile({ entity: entity as EntityFile })
      case entity instanceof EntityObject:
        return new PumlPrintableObject({ entity: entity as EntityObject })
      case entity instanceof EntityInterface:
        return new PumlPrintableInterface({ entity: entity as EntityInterface })
      default:
        logger.warn(`Unknown entity type ${entity.constructor.name}`)
    }
  },
}

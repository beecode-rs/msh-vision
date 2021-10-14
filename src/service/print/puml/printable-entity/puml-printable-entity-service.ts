import { Entity, EntityType } from 'src/model/entity'
import { Printable } from 'src/service/print/printable'
import { PumlPrintableClass } from 'src/service/print/puml/printable-entity/puml-printable-class'
import { PumlPrintableFile } from 'src/service/print/puml/printable-entity/puml-printable-file'
import { PumlPrintableObject } from 'src/service/print/puml/printable-entity/puml-printable-object'

export const pumlPrintableEntityService = {
  printableStrategyFromEntity: ({ entity }: { entity: Entity }): Printable => {
    switch (entity.Type) {
      case EntityType.CLASS:
        return new PumlPrintableClass({ entity })
      case EntityType.FILE:
        return new PumlPrintableFile({ entity })
      case EntityType.OBJECT:
      default:
        return new PumlPrintableObject({ entity })
    }
  },
}

import { Entity } from 'src/model/entity'
import { Printable } from 'src/service/print/printable'
import { PumlPrintableEntity } from 'src/service/print/puml/puml-printable-entity/puml-printable-entity'

export const pumlPrintableEntityService = {
  printableStrategyFromEntity: ({ entity }: { entity: Entity }): Printable => {
    return new PumlPrintableEntity({ entity })
  },
}

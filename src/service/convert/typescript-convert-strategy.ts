import { fs } from 'mz'
import { parse } from 'recast'
import { ConvertStrategy } from 'src/service/convert/convert-strategy'

export class TypescriptConvertStrategy implements ConvertStrategy {
  public async convert(fileLocation: string): Promise<any> {
    const fileData = await fs.readFile(fileLocation)
    const parsedResult = parse(fileData.toString('utf8'))
    return parsedResult
  }
}

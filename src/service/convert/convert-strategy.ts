export interface ConvertStrategy {
  convert(fileLocation: string): Promise<any>
}

export interface Printable {
  addChildren(printable: Printable): void
  print(): string
}

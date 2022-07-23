export interface Choices {
  name: string,
  message: string,
  initial: number,
  normalized: true,
  value: string,
  input: string,
  index: number,
  cursor: number,
  level: number,
  indent: string,
  path: string,
  enabled: boolean,
  reset: Function
}
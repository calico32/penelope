export const BASE_URL = Bun.env.BASE_URL
export const url = (path: string) => `${BASE_URL}${path}`

export function cleanOutput(output: string) {
  return output.split('\r\n').join('\n')
}

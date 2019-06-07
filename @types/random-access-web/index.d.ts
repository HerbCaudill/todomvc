type Callback = (err: string | null) => void

interface ReadParams {
  offset: number
  size: number
  callback?: Callback
}

interface WriteParams {
  offset: number
  data: Buffer
}

type Options =
  | number
  | Buffer
  | {
      length?: number
      buffer?: Buffer
      pageSize?: number
    }

declare module 'random-access-web' {
  const storage: {
    (opts?: Options): any
    read(req: ReadParams): void
    write(req: WriteParams): void
    del(req: ReadParams): void
  }
  export = storage
}

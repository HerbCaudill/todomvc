import { EventEmitter } from 'events'

declare module hypermerge {
  interface Hypermerge extends EventEmitter {
    core: any
    getId: (doc: any) => string
    getActorId: (doc: any) => string
    metadata: (actor: string) => any
    metadatas: (id: string) => any[]
    create: Function
    open: Function
    fork: Function
    merge: Function
    update: Function
  }
}

import { Middleware, Action } from 'redux'
import { Repo } from 'hypermerge'

export interface Options {
  init: (action: Action) => any // default state?
  map?: (action: _Action, state?: any) => any
}

export interface _Action extends Action {
  id: string
  doc?: any
  docId?: string
  isOnline?: boolean
  metadata?: any
  metadatas?: any[]
}

export interface Peer {
  _index: number
  id: string
  projectId: string
  identityId: string
  remoteId: string
  isOnline: boolean
  isSelf: boolean
  canWrite: boolean
}

export const hypermergeRedux = (
  repo: Repo,
  { init, map = (x: any) => x }: Options
): Middleware => ({ dispatch, getState }) => next => {
  // const withDoc = (type: string, doc: any) => {
  //   const id = repo.getId(doc)
  //   const actor = repo.getActorId(doc)

  //   // For now, merge the metadata and infos together
  //   const metadata = repo.metadata(actor)
  //   const metadatas = repo.metadatas(id)

  //   return map(
  //     {
  //       type,
  //       id,
  //       doc,
  //       metadata,
  //       metadatas,
  //     },
  //     getState()
  //   )
  // }

  // const withPeer = (type: string, docId: string, peer: Peer) => {
  //   return map(
  //     {
  //       type,
  //       id: peer.remoteId.toString(),
  //       docId,
  //       isOnline: peer._index > -1,
  //     },
  //     getState()
  //   )
  // }

  // repo
  //   .once('ready', () => {
  //     const archiverKey = repo.core.archiver.changes.key.toString('hex')

  //     dispatch({ type: 'HYPERMERGE_READY', archiverKey })
  //   })
  //   .on('document:ready', (_id, doc) =>
  //     dispatch(withDoc('DOCUMENT_READY', doc))
  //   )
  //   .on('document:updated', (_id, doc) =>
  //     dispatch(withDoc('DOCUMENT_UPDATED', doc))
  //   )
  //   .on('peer:joined', (docId, peer) => {
  //     if (!peer.remoteId) return
  //     dispatch(withPeer('PEER_JOINED', docId, peer))
  //   })
  //   .on('peer:left', (docId, peer) => {
  //     if (!peer.remoteId) return
  //     dispatch(withPeer('PEER_LEFT', docId, peer))
  //   })

  return _action => {
    const action = map(_action, getState())
    switch (action.type) {
      // case 'CREATE_DOCUMENT':
      //   return next(
      //     withDoc(
      //       'DOCUMENT_CREATED',
      //       repo.update(init(action.metadata)(repo.create(action.metadata)))
      //     )
      //   )

      // case 'OPEN_DOCUMENT':
      //   repo.open(action.id)
      //   return next(
      //     map(Object.assign({}, action, { type: 'DOCUMENT_OPENING' }))
      //   )

      case 'UPDATE_DOCUMENT':
        repo.update(action.doc)
        return next(action)

      // case 'DELETE_DOCUMENT':
      //   return next({ type: 'DOCUMENT_DELETED', id: action.id })

      // case 'FORK_DOCUMENT': {
      //   const doc = repo.fork(action.id)
      //   return next(withDoc('DOCUMENT_FORKED', doc))
      // }

      // case 'MERGE_DOCUMENT':
      //   return next(
      //     withDoc('DOCUMENT_MERGED', repo.merge(action.dst, action.src))
      //   )
    }
  }
}

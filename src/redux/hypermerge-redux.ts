import { Middleware } from 'redux'
import { Repo } from 'hypermerge'
// import { State } from 'src/types'
import { diff } from 'deep-diff'

export const hypermergeRedux = <T>(
  repo: Repo<T>,
  url: string
): Middleware => store => next => action => {
  const prev = store.getState()
  const result = next(action)
  const curr = store.getState()

  watch(repo, url, prev, curr)

  return result
}

const watch = <T>(repo: Repo<T>, url: string, prev: any, curr: any) => {
  console.log(repo, url, prev, curr)
  const differences = diff(prev, curr)
  for (const d in differences) {
    console.log(d)
  }
  // for (let k: string in curr) {
  //   const currRec = curr[k]
  //   const prevRec = prev[k]
  //   if (!currRec || !currRec.doc) return
  //   if (!prevRec || !prevRec.doc) return
  //   if (currRec == prevRec) return
  //   console.log(currRec, k)
  //   repo.update(currRec.doc)
  // })
}

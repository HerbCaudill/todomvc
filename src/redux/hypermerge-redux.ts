import { Middleware } from 'redux'
import { Repo } from 'hypermerge'
import { State } from 'src/types'

export const hypermergeRedux = (
  repo: Repo
): Middleware => store => next => action => {
  const prev = store.getState()
  const result = next(action)
  const curr = store.getState()

  watch(repo, prev, curr)

  return result
}

const watch = (repo: Repo, prev: State, curr: State) => {
  console.log(repo, prev, curr)
  // const prev = prevState.getIn(path)
  // const curr = currState.getIn(path)

  // if (is(curr, prev)) return

  // curr.forEach((rec, k) => {
  //   const pRec = prev.get(k)

  //   if (!rec || !rec.doc) return
  //   if (!pRec || !pRec.doc) return
  //   if (equals(rec, pRec)) return
  //   if (rec.doc === repo.find(repo.getId(rec.doc))) return

  //   console.log(rec, k)
  //   repo.update(rec.doc)
  // })
}

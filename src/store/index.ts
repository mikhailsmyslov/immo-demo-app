import news from './news'

const slices = [news]

export const reducers = slices.reduce(
  (acc, slice) => ({ ...acc, [slice.name]: slice.reducer }),
  {}
)

export const actions = slices.reduce(
  (acc, slice) => ({ ...acc, ...slice.actions }),
  {}
)

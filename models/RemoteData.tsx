type Loading = {
  state: "loading"
}

type Present<T> = {
  state: "present"
  data: T
}

type NotAsked = {
  state: "not-asked"
}

export type RemoteData<T> = Loading | Present<T> | NotAsked

export function loading<T>(): RemoteData<T> {
  return {
    state: "loading",
  }
}

export function present<T>(data: T): RemoteData<T> {
  return {
    state: "present",
    data,
  }
}

export function notAsked<T>(): RemoteData<T> {
  return {
    state: "not-asked",
  }
}

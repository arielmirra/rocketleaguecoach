export class TrackerStats {
  segments: Segment[]
}

export class Segment {
  type: string
  attributes: Attributes
  metadata: Metadata
  stats: Map<string, Stat>
}

export class Metadata {
  name: string
}

export class Attributes {
  playlistId: number
  season: number
}

export class Stat {
  rank: number
  percentile: number
  category: string
  metadata: Metadata
  value: number
}

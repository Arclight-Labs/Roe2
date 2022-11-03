export interface Rundown {
  roomId: string
  id: string
  /**
   * Name of the rundown, a room can have multiple rundowns
   * that's why name is required for a room
   */
  name: string
  desc: string
  image: string
  flow: RundownFlowItem[]
  columns: Record<string, RundownColumn>
  columnOrder: string[]
  currentItem: string
  callout: RundownCallout
}

export interface RundownStyles {
  textColor: string
  backgroundColor: string
}

export interface RundownCallout extends RundownStyles {
  text: string
  icon: string
  live: boolean
}

export interface RundownColumn extends RundownStyles {
  id: string
  name: string
  hidden: boolean
}

export interface RundownFlowItem extends RundownStyles {
  roomId: string
  rundownId: string
  id: string
  title: string
  desc: string
  matchId: string
  columns: Record<string, string>
}

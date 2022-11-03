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
  callout?: RundownCallout
}

export interface RundownCallout {
  text: string
  icon: string
  style: RundownCalloutStyle
}

export interface RundownCalloutStyle {
  color: string
  backgroundColor: string
}

export interface RundownColumn extends RundownFlowItemStyles {
  id: string
  name: string
  hidden: boolean
}

export interface RundownFlowItem extends RundownFlowItemStyles {
  roomId: string
  rundownId: string
  id: string
  title: string
  desc: string
  matchId: string
  columns: Record<string, string>
}

export interface RundownFlowItemStyles {
  backgroundColor: string
  textColor: string
}

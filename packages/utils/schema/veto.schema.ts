import { v4 as uuidV4 } from "uuid"
import { z } from "zod"

export const vetoTeamSchema = z.union([z.literal("teamA"), z.literal("teamB")])
export type VetoTeam = z.infer<typeof vetoTeamSchema>
export const vetoActionSchema = z.union([
  z.literal("ban"),
  z.literal("pick"),
  z.literal("decider"),
])
export type VetoAction = z.infer<typeof vetoActionSchema>

export const vetoSideSchema = z.union([z.literal("red"), z.literal("blue")])

export const vetoItemStatusSchema = z.union([
  z.literal("pending"),
  z.literal("awaitingMapPick"),
  z.literal("awaitingSidePick"),
  z.literal("complete"),
])

export const vetoSequenceSchema = z.number().min(0)

export const coinTeamResultSchema = z.union([
  z.literal("winner"),
  z.literal("loser"),
])

export type CoinTeamResult = z.infer<typeof coinTeamResultSchema>

export const sideActorSchema = z.union([
  z.literal("winner"),
  z.literal("loser"),
  z.literal("random"),
])
export type SideActor = z.infer<typeof sideActorSchema>

export const coinSide = z.union([z.literal("heads"), z.literal("tails")])

export const coinFlipSchema = z
  .object({
    heads: vetoTeamSchema.nullable().default(null),
    tails: vetoTeamSchema.nullable().default(null),
    result: z
      .union([z.literal("heads"), z.literal("tails"), z.null()])
      .default(null),
    winner: vetoTeamSchema.nullable().default(null),
    loser: vetoTeamSchema.nullable().default(null),
  })
  .default({
    heads: null,
    loser: null,
    result: null,
    tails: null,
    winner: null,
  })

export type CoinFlip = z.infer<typeof coinFlipSchema>

export const vetoSequenceSettingsItemSchema = z.object({
  mode: z.string().nullable(),
  action: vetoActionSchema,
  mapActor: coinTeamResultSchema.nullable(),
  sideActor: sideActorSchema.nullable(),
  description: z.string().nullable(),
})
export type VetoSequenceSettingsItem = z.infer<
  typeof vetoSequenceSettingsItemSchema
>

export const vetoMapSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidV4()),
  imageUrl: z.string().default(""),
  name: z.string().min(1),
})

export const vetoModeSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidV4()),
  imageUrl: z.string().default(""),
  name: z.string().min(1),
  mapPool: z.array(z.string().uuid()).default([]),
})
export type VetoMap = z.infer<typeof vetoMapSchema>
export type VetoMode = z.infer<typeof vetoModeSchema>

export const vetoSettingsTypeSchema = z.enum(["standard", "coinFlipOnly"])
export type VetoSettingsType = z.infer<typeof vetoSettingsTypeSchema>
export const vetoSettingsSchema = z
  .object({
    type: vetoSettingsTypeSchema,
    autoStart: z.boolean().default(true),
    sequence: z.array(vetoSequenceSettingsItemSchema).default([]),
    modes: z.array(vetoModeSchema).default([]),
    mapPool: z.array(vetoMapSchema).default([]),
    redSideName: z.string().min(1).default("Attacker"),
    blueSideName: z.string().min(1).default("Defender"),
    timer: z.number().nullable(),
    seedWinner: vetoTeamSchema.nullable().optional(),
  })
  .refine(({ sequence, modes, mapPool, type }) => {
    const isValidSequence = sequence.every(({ mode }) => {
      if (mode === null) return true
      return modes.some(({ id }) => id === mode)
    })

    const mapPoolIds = mapPool.map((map) => map.id)
    const isValidModes = modes.every(({ mapPool }) => {
      return mapPool.every((mapId) => mapPoolIds.includes(mapId))
    })

    const hasMapPool = !!mapPool.length
    const hasSequence = !!sequence.length
    const isCoinflip = type === "coinFlipOnly"
    const isValidMapPool = isCoinflip || (hasMapPool && hasSequence)

    return isValidSequence && isValidModes && isValidMapPool
  })

export type VetoSettings = z.infer<typeof vetoSettingsSchema>

export const vetoSequenceItemSchema = z.object({
  action: vetoActionSchema.nullable(),
  mode: z.string().nullable(),
  status: vetoItemStatusSchema,
  mapActor: coinTeamResultSchema.nullable(),
  mapActorSide: vetoSideSchema.nullable(),
  mapPicked: z.string().nullable(),
  sideActor: sideActorSchema.nullable(),
  sidePicked: vetoSideSchema.nullable(),
  description: z.string().nullable(),
})

export type VetoSequence = z.infer<typeof vetoSequenceItemSchema>

export const vetoAccessRequestItemSchema = z.object({
  uid: z.string(),
  ign: z.string(),
})

export const vetoPasswordTypeSchema = z.enum(["teamA", "teamB", "host"])
export const vetoPasswordSchema = z.object({
  teamA: z.string(),
  teamB: z.string(),
  host: z.string(),
})
export type VetoPasswordType = z.infer<typeof vetoPasswordTypeSchema>
export type VetoPassword = z.infer<typeof vetoPasswordSchema>

export const vetoReadyCheckSchema = z.object({
  teamA: z.boolean().default(false),
  teamB: z.boolean().default(false),
  host: z.boolean().default(false),
})

export type VetoReadyCheck = z.infer<typeof vetoReadyCheckSchema>

export const vetoSchema = z.object({
  settings: vetoSettingsSchema,
  passwords: vetoPasswordSchema,
  currentSequence: vetoSequenceSchema,
  coinFlip: coinFlipSchema,
  sequence: z.array(vetoSequenceItemSchema),
  readyCheck: vetoReadyCheckSchema,
})

export type Veto = z.infer<typeof vetoSchema>

export const vetoMapPickSchema = z.object({
  team: vetoTeamSchema,
  seriesId: z.string(),
  map: z.string(),
})

export type VetoMapPick = z.infer<typeof vetoMapPickSchema>

export const vetoSidePickSchema = z.object({
  team: vetoTeamSchema,
  seriesId: z.string(),
  side: vetoSideSchema,
})

export type VetoSidePick = z.infer<typeof vetoSidePickSchema>

// Requesting passwords from server
export const vetoPasswordRequestSchema = z.object({
  roomId: z.string(),
  seriesId: z.string(),
  type: vetoPasswordTypeSchema,
})
export type VetoPasswordRequest = z.infer<typeof vetoPasswordRequestSchema>

export const vetoReadySchema = z.object({
  side: vetoPasswordTypeSchema,
  ready: z.boolean(),
})

export type VetoReady = z.infer<typeof vetoReadySchema>

export const vetoClaimCoinSchema = z.object({
  teamSide: vetoTeamSchema,
  coinSide: coinSide,
})

export type VetoClaimCoin = z.infer<typeof vetoClaimCoinSchema>

// Presets

export const vetoPresetSchema = z.object({
  name: z.string().min(1),
  settings: vetoSettingsSchema,
})

export type VetoPreset = z.infer<typeof vetoPresetSchema> & {
  owner: string
  id: string
}

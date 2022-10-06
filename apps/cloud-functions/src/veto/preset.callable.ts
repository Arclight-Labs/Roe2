import type { z as Z } from "zod"
import { functions } from "../admin"
import { authCheck, Err } from "../utils"
import { runtimeOptions } from "../utils/cfRuntimeOptions"
import col from "../utils/fsCol"

export const preset = functions
  .region("asia-east2")
  .runWith(runtimeOptions)
  .https.onCall(async (props, context) => {
    const auth = authCheck(context.auth)
    const { z } = await import("zod")
    const { v4: uuidV4 } = await import("uuid")

    const coinTeamResultSchema = z.union([
      z.literal("winner"),
      z.literal("loser"),
    ])
    const vetoActionSchema = z.union([
      z.literal("ban"),
      z.literal("pick"),
      z.literal("decider"),
    ])
    const sideActorSchema = z.union([
      z.literal("winner"),
      z.literal("loser"),
      z.literal("random"),
    ])
    const vetoModeSchema = z.object({
      id: z
        .string()
        .uuid()
        .default(() => uuidV4()),
      imageUrl: z.string().default(""),
      name: z.string().min(1),
      mapPool: z.array(z.string().uuid()).default([]),
    })

    const vetoMapSchema = z.object({
      id: z
        .string()
        .uuid()
        .default(() => uuidV4()),
      imageUrl: z.string().default(""),
      name: z.string().min(1),
    })
    const vetoSettingsTypeSchema = z.enum(["standard", "coinFlipOnly"])
    const vetoSequenceSettingsItemSchema = z.object({
      mode: z.string().nullable(),
      action: vetoActionSchema,
      mapActor: coinTeamResultSchema.nullable(),
      sideActor: sideActorSchema.nullable(),
    })
    const vetoSettingsSchema = z
      .object({
        type: vetoSettingsTypeSchema,
        autoStart: z.boolean().default(true),
        sequence: z.array(vetoSequenceSettingsItemSchema).default([]),
        modes: z.array(vetoModeSchema).default([]),
        mapPool: z.array(vetoMapSchema).default([]),
        redSideName: z.string().min(1).default("Attacker"),
        blueSideName: z.string().min(1).default("Defender"),
        timer: z.number().nullable(),
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

    const vetoPresetSchema = z.object({
      name: z.string(),
      settings: vetoSettingsSchema,
    })
    type VetoPreset = Z.infer<typeof vetoPresetSchema> & {
      owner: string
      id: string
    }

    const res = vetoPresetSchema.safeParse(props)
    if (!res.success) {
      throw new Err("invalid-argument", "Invalid Argument", res.error)
    }

    console.log("test")
    const ref = col<VetoPreset>("veto_presets").doc()
    return ref.set({ ...res.data, owner: auth.uid, id: ref.id })
  })

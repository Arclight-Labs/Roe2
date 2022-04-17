type Timestamps = { createdAt: Date; updatedAt: Date }
export type DbModel<T> = T & Timestamps

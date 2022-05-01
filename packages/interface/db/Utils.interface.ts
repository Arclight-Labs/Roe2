type Timestamps = { createdAt: Date; updatedAt: Date }
export type DbModel<T> = T & Timestamps

export class FilePreview {
  file: File | null = null
  path: string = ""

  constructor(file?: File) {
    if (file) {
      this.file = file
      this.path = URL.createObjectURL(file)
    }
  }
}

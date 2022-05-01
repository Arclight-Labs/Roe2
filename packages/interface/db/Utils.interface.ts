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

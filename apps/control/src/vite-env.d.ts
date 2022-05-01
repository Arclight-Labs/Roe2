/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PACKAGE_VERSION: string
  readonly IS_EMULATED?: "true"
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

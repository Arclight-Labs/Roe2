import doc from "./fsDoc"

export default async function deleteOne(...pathSegments: string[]) {
  return doc(...pathSegments).delete()
}

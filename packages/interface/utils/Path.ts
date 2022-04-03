// export type NestedKeyOf<ObjectType extends object> = {
//   [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
//     ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
//     : `${Key}`
// }[keyof ObjectType & (string | number)]

type PathTree<T> = {
  [P in keyof T]-?: T[P] extends object ? [P] | [P, ...Path<T[P]>] : [P]
}

export type Path<T> = PathTree<T>[keyof PathTree<T>]

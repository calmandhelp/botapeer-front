import { Label } from "model/label"
import { Post } from "model/post"

export type PlantRecord = {
  id?: number,
  userId?: number,
  title?: string,
  alive?: boolean,
  status?: number
  endDate?: Date
  createdAt?: Date
  updatedAt?: Date
  posts: Post[]
  label: Label[]
}
import { Post } from "model/post"
import { Place } from "model/place"

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
  place: Place
}
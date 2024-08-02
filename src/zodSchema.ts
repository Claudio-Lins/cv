import * as z from "zod"

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  pictureUrl: z.string().url(),
})

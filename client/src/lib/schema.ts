import { z } from "zod"

export const onboardingSchema = z.object({
  fullname: z.string().min(3).max(20),
  gender: z.enum(["male", "female"]),
  phoneNo: z.string().max(13,{
    message: "Namba ya simu inabidi isizidi tarakimu 12"
  }),
  Email: z.string().optional(),
  feedbackType: z.enum(["suggestion","alert","compliment","complaint"]),
  message: z.string().min(5, "Ujumbe ni kwanzia herufi 5"),
  attachment: z.any().optional(),
});

export type onboardingSchema = z.infer<typeof onboardingSchema>;
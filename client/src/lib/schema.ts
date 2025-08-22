import { z } from "zod"

export const onboardingSchema = z.object({
  fullname: z.string()
  .min(1,{
    message: "Tafadhali jaza majina yako kamili"
  })
  .max(20),
  gender: z.enum(["male", "female"]),
  phoneNo: z.string()
  .min(5,{
    message: "Tafadhali jaza namba yako ya simu"
  })
  .max(13,{
    message: "Namba ya simu inabidi isizidi tarakimu 12"
  }),
  Email: z.string().optional(),
  feedbackType: z.string().min(1,{
    message:"Tafadhali chagua aina ya mrejesho unaotaka kuwasilisha"
    }),
  message: z.string().min(5, "Ujumbe ni kwanzia herufi 5"),
  attachment: z.any().optional(),
  service: z.string().min(1,{
    message: "Tafadhali chagua aina ya huduma unayotaka kuitolea mrejesho kutoka kwenye orodha hii"
  }),
  });

export type onboardingSchema = z.infer<typeof onboardingSchema>;
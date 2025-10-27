import { formOptions, revalidateLogic } from "@tanstack/react-form"
import z from "zod"
import { pt } from "zod/locales"

z.config(pt())

export const registerSchema = z
  .object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não coincidem",
        path: ["confirmPassword"]
      })
    }
  })

export const registerFormOptions = formOptions({
  defaultValues: {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "blur"
  }),
  validators: {
    onSubmit: registerSchema
  }
})

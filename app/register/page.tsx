"use client"

import { revalidateLogic } from "@tanstack/react-form"
import z from "zod"
import { pt } from "zod/locales"
import { UserPlus } from "lucide-react"

z.config(pt())

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"
import { Separator } from "@/components/ui/separator"
import { ThemeSwitcher } from "@/components/theme-switcher"

const registerSchema = z
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

export default function RegisterPage() {
  const form = useAppForm({
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
    },
    onSubmit: ({ value }) => {
      console.log("Form submitted:", value)
    }
  })

  return (
    <main className="relative grid h-screen place-items-center">
      <div className="absolute top-8 right-8">
        <ThemeSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2">
            <UserPlus />
            <h3 className="font-sans">Crie uma conta</h3>
          </CardTitle>
          <CardDescription>Por favor, preencha o formulário abaixo para criar uma conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <FieldGroup>
              <form.AppField name="name">
                {({ InputField }) => <InputField label="Name" placeholder="Your full name" />}
              </form.AppField>

              <form.AppField name="email">
                {({ InputField }) => <InputField label="Email" placeholder="Your email address" />}
              </form.AppField>

              <form.AppField name="password">
                {({ InputField }) => <InputField label="Password" placeholder="Your password" />}
              </form.AppField>

              <form.AppField name="confirmPassword" validators={{ onChangeListenTo: ["password"] }}>
                {({ InputField }) => <InputField label="Confirm Password" placeholder="Confirm your password" />}
              </form.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />
        <CardFooter>
          <Field orientation="horizontal">
            <form.AppForm>
              <form.ResetButton variant="secondary" />
            </form.AppForm>
            <form.AppForm>
              <form.SubmitButton label="Cadastrar" form="register-form" className="flex-1" />
            </form.AppForm>
          </Field>
        </CardFooter>
      </Card>
    </main>
  )
}

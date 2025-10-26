"use client"

import { revalidateLogic } from "@tanstack/react-form"
import z from "zod"
import { pt } from "zod/locales"
import { UserPlus } from "lucide-react"
import Cookies from "js-cookie"

z.config(pt())

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { useAppForm } from "@/hooks/form"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

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
      Cookies.set("user", JSON.stringify({ name: value.name, email: value.email }))
      router.push("/")
    }
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <UserPlus />
          <h3 className="font-sans">Crie uma conta</h3>
        </CardTitle>
        <CardDescription>Preencha o formulário abaixo para criar uma conta.</CardDescription>
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
              {({ InputField }) => <InputField label="Name" placeholder="Seu nome completo" />}
            </form.AppField>

            <form.AppField name="email">
              {({ InputField }) => <InputField label="Email" placeholder="Seu endereço de email" />}
            </form.AppField>

            <form.AppField name="password">
              {({ InputField }) => <InputField label="Password" placeholder="Sua senha" type="password" />}
            </form.AppField>

            <form.AppField name="confirmPassword" validators={{ onChangeListenTo: ["password"] }}>
              {({ InputField }) => (
                <InputField label="Confirm Password" placeholder="Confirme sua senha" type="password" />
              )}
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
  )
}

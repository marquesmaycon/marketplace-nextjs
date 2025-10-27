"use client"

import Cookies from "js-cookie"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"
import { registerFormOptions } from "@/features/auth/register-form-options"
import { useAppForm } from "@/hooks/form"

export default function RegisterPage() {
  const router = useRouter()

  const form = useAppForm({
    ...registerFormOptions,
    onSubmit: ({ value }) => {
      Cookies.set("user", JSON.stringify({ name: value.name, email: value.email }))
      router.push("/")
      toast.success("Conta criada com sucesso!")
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

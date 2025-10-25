import type { ComponentProps } from "react"
import { useFormContext } from "@/hooks/form-context"
import { SendHorizonal } from "lucide-react"

import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type SubmitButtonProps = ComponentProps<typeof Button> & {
  label: string
}

export default function SubmitButton({ label, ...props }: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.isDirty]}>
      {([isSubmitting, isDirty]) => (
        <Button type="submit" disabled={!isDirty} {...props}>
          {isSubmitting ? <Spinner /> : label || "Enviar"} <SendHorizonal />
        </Button>
      )}
    </form.Subscribe>
  )
}

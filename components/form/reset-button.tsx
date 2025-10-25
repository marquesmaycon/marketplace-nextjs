import type { ComponentProps } from "react"
import { useFormContext } from "@/hooks/form-context"
import { Undo2 } from "lucide-react"

import { Button } from "../ui/button"

type ResetButtonProps = ComponentProps<typeof Button> & {
  label?: string
}

export default function ResetButton({ label, ...props }: ResetButtonProps) {
  const form = useFormContext()

  return (
    <Button type="button" onClick={() => form.reset()} {...props}>
      {label || "Resetar Formulário"} <Undo2 />
    </Button>
  )
}

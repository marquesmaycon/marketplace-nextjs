import type { ComponentProps } from "react"
import { useFormContext } from "@/hooks/form-context"

import { Button } from "../ui/button"
import { Undo2 } from "lucide-react"

type ResetButtonProps = ComponentProps<typeof Button> & {
  label?: string
}

export default function ResetButton({ label, ...props }: ResetButtonProps) {
  const form = useFormContext()

  return (
    <Button type="button" onClick={() => form.reset()} {...props}>
      {label || "Reset form"} <Undo2 />
    </Button>
  )
}

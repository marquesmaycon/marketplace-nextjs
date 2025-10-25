import type { ComponentProps } from "react"
import { useFormContext } from "@/hooks/form-context"

import { Button } from "../ui/button"

type ResetButtonProps = ComponentProps<typeof Button> & {
  label?: string
}

export default function ResetButton({ label, ...props }: ResetButtonProps) {
  const form = useFormContext()

  return (
    <Button type="button" onClick={() => form.reset()} {...props}>
      {label || "Reset"}
    </Button>
  )
}

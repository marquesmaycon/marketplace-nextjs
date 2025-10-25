import type { ComponentProps } from "react"
import { useFormContext } from "@/hooks/form-context"

import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"
import { SendHorizonal } from "lucide-react"

type SubmitButtonProps = ComponentProps<typeof Button> & {
  label: string
}

export default function SubmitButton({ label, ...props }: SubmitButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.isDirty]}>
      {([isSubmitting, isDirty]) => (
        <Button type="submit" disabled={!isDirty} {...props}>
          {isSubmitting ? <Spinner /> : label || "Submit"} <SendHorizonal />
        </Button>
      )}
    </form.Subscribe>
  )
}

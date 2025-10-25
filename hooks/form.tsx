import { createFormHook } from "@tanstack/react-form"
import { lazy } from "react"

const InputField = lazy(() => import("../components/form/input-field"))
const SubmitButton = lazy(() => import("../components/form/submit-button"))
const ResetButton = lazy(() => import("../components/form/reset-button"))

import { fieldContext, formContext } from "./form-context"

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    InputField
  },
  formComponents: {
    SubmitButton,
    ResetButton
  },
  fieldContext,
  formContext
})

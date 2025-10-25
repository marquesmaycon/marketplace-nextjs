import { createFormHook } from "@tanstack/react-form"
import { lazy } from "react"

const InputField = lazy(() => import("../components/form/input-field"))
const SubmitButton = lazy(() => import("../components/form/submit-button"))
const ResetButton = lazy(() => import("../components/form/reset-button"))
const SelectField = lazy(() => import("../components/form/select-field"))

import { fieldContext, formContext } from "./form-context"

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    InputField,
    SelectField
  },
  formComponents: {
    SubmitButton,
    ResetButton
  },
  fieldContext,
  formContext
})

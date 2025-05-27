// components/ui/use-toast.ts
import { createContext, useContext } from "react"
import { toast as defaultToast } from "sonner" // ou autre système de toast

const ToastContext = createContext({ toast: defaultToast })

export function useToast() {
  return useContext(ToastContext)
}

import { toast as sonnerToast } from "sonner";

/**
 * Hook mínimo compatible con los componentes shadcn.
 * Devuelve { toast } y además exporta toast directo.
 */
export function useToast() {
  return { toast: sonnerToast };
}

export const toast = sonnerToast;

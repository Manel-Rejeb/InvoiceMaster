import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function mr(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
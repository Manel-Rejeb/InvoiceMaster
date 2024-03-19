"use client"

import type { FC } from "react"

type ComponentProps = {
    type: "email" | "password" | "number" | "text" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color"
    label?: string
    placeholder?: string
    required?: boolean
}

export const Input: FC<ComponentProps & Record<string, any>> = ({ type = "text", label, placeholder, required = false }) => {
    // TODO: ajouter une contraint sur l'input en cas d'erreur
    // TODO: fixer le prop auto complete (if password = new-password ) else = off
    return (
        <div>
            {label && <label htmlFor={type} className="block text-sm mb-2 dark:text-white">{label}</label>}
            <div className="relative">
                <input autoComplete="off" placeholder={placeholder} required={required} type={type} id={type} name={type} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                    <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                    </svg>
                </div>
            </div>
            <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
        </div>
    )
}

import Link from "next/link"
import type { FC } from "react"

export const AuthFooter: FC = () => {
    return (
        <div className="w-full flex items-center gap-6">
            {FOOTER_NAVIGATION.map((item: string, index: number) => (<Link key={index} passHref href={`/${item}`} className="capitalize text-gray-500 hover:text-gray-950">{item}</Link>))}
        </div>
    )
}

const FOOTER_NAVIGATION: string[] = ["terms", "pricing", "contact"]
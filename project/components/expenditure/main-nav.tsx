import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/sales"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
       sales
      </Link>
      <Link
        href="/fa"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        friquently asked
      </Link>
      <Link
        href="/expenditure/add"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        add
      </Link>
      
    </nav>
  )
}

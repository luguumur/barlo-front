"use client"

import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartDropdownProvider>
      <MobileMenuProvider>
        {children}
      </MobileMenuProvider>
    </CartDropdownProvider>
  )
}

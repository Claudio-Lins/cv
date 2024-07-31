import { cn } from "@/lib/utils"
import { Home, Mail, Phone } from "lucide-react"

interface ContactsProps {
  phone?: string
  email?: string
  address?: {
    street?: string
    city?: string
    state?: string
    county?: string | null
    country?: string
    zip?: string
  }
}

export function Contacts({ phone, email, address }: ContactsProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Contacts</h3>
      <div className="flex flex-col mt-6 space-y-4">
        {phone && (
          <div className="flex items-center space-x-2 text-zinc-600 text-sm">
            <Phone size={14} />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-2 text-zinc-600 text-sm">
            <Mail size={14} />
            <span>{email}</span>
          </div>
        )}
        {address && (
          <div className="flex space-x-2 text-zinc-600 text-sm">
            <Home size={14} />
            <div className="flex flex-col -mt-0.5">
              <span>{address?.street}</span>
              <span>{address?.county}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

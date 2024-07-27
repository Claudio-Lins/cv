import { cn } from "@/lib/utils"
import { Home, Mail, Phone } from "lucide-react"

interface ContactsProps {}

export function Contacts({}: ContactsProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Contacts</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <Phone size={14} />
          <span>+ 353 083 4280</span>
        </div>
        <div className="flex items-center space-x-2 text-zinc-600 text-sm">
          <Mail size={14} />
          <span>claudio.lins@me.com</span>
        </div>
        <div className="flex space-x-2 text-zinc-600 text-sm">
          <Home size={14} />
          <div className="flex flex-col -mt-0.5">
            <span>44 Mountjoy Street</span>
            <span>Dublin 07</span>
          </div>
        </div>
      </div>
    </div>
  )
}

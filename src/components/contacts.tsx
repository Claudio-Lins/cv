import { cn } from "@/lib/utils"
import { FacebookIcon, Home, LinkedinIcon, Mail, Phone } from "lucide-react"
import {
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaFacebook,
  FaLinkedinIn,
} from "react-icons/fa6"

interface ContactsProps {
  phone?: string
  email?: string
  street?: string
  city?: string
  state?: string
  county?: string | null
  country?: string
  zip?: string

  socialNetworks?: {
    id: string
    name: string
    url: string
  }[]
}

export function Contacts({
  phone,
  email,
  street,
  city,
  state,
  country,
  zip,
  socialNetworks,
}: ContactsProps) {
  return (
    <div
      className={cn("font-light text-zinc-600 tracking-widest print:text-xs ")}
    >
      <h3 className=" uppercase font-light">Contacts</h3>
      <div className="flex flex-col mt-6 space-y-2">
        {phone && (
          <div className="flex items-center space-x-2 text-zinc-600 text-sm print:text-xs">
            <Phone size={14} />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center space-x-2 text-zinc-600 text-sm print:text-xs">
            <Mail size={14} />
            <span>{email}</span>
          </div>
        )}
        {street && (
          <div className="flex space-x-2 text-zinc-600 w-full text-sm print:text-xs">
            <Home className="text-sm" />
            <div className="flex gap-x-2 gap-y-1 flex-wrap -mt-0.5 text-sm print:text-xs">
              {street && <p className="w-full">{street}</p>}
              {city && <p>{city}</p>}
              {city && <p>|</p>}
              {state && <p>{state}</p>}
              {city && <p>|</p>}
              {zip && <p>{zip}</p>}
              {country && <p className="w-full">{country}</p>}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {socialNetworks?.map((social) => (
          <div className="" key={social.id}>
            {social?.name.includes("Github") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaGithub size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("LinkedIn") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaLinkedinIn size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Facebook") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaFacebook size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Twitter") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaXTwitter size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Instagram") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaInstagram size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("YouTube") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaYoutube size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

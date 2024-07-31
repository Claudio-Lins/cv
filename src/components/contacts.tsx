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
  address?: {
    street?: string
    city?: string
    state?: string
    county?: string | null
    country?: string
    zip?: string
  }
  socials?: {
    id: string
    name: string
    url: string
    imageUrl: string | null
  }[]
}

export function Contacts({ phone, email, address, socials }: ContactsProps) {
  return (
    <div className={cn("font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase font-light">Contacts</h3>
      <div className="flex flex-col mt-6 space-y-2">
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
              {address?.street && <span>{address?.street}</span>}
              {address?.county && <span>{address?.county}</span>}
              {address?.city && <span>{address?.city}</span>}
              {address?.state && <span>{address?.state}</span>}
              {address?.zip && <span>{address?.zip}</span>}
              {address?.country && <span>{address?.country}</span>}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {socials?.map((social) => (
          <div className="" key={social.id}>
            {social?.name.includes("Github") && (
              <div className="flex items-center gap-x-2 text-sm">
                <FaGithub size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("LinkedIn") && (
              <div className="flex items-center gap-x-2 text-sm">
                <FaLinkedinIn size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Facebook") && (
              <div className="flex items-center gap-x-2 text-sm">
                <FaFacebook size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Twitter") && (
              <div className="flex items-center gap-x-2 text-sm">
                <FaXTwitter size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("Instagram") && (
              <div className="flex items-center gap-x-2 text-sm">
                <FaInstagram size={14} />
                <a href={social?.url} target="_blank" rel="noopener noreferrer">
                  {social?.name}
                </a>
              </div>
            )}
            {social?.name.includes("YouTube") && (
              <div className="flex items-center gap-x-2 text-sm">
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

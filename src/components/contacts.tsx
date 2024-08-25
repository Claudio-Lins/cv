import { cn } from "@/lib/utils"
import { phoneRegex } from "../zodSchema"
import {
  FacebookIcon,
  Home,
  HomeIcon,
  LinkedinIcon,
  Mail,
  Phone,
} from "lucide-react"
import {
  FaXTwitter,
  FaInstagram,
  FaGithub,
  FaYoutube,
  FaFacebook,
  FaLinkedinIn,
  FaHouseMedical,
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
      className={cn(
        "font-light text-zinc-600 tracking-widest print:tracking-wider"
      )}
    >
      <h3 className="uppercase font-light myPrintingSubTitle">Contacts</h3>
      <div className="flex flex-col mt-6 gap-2 print:gap-0">
        {phone && (
          <div className="flex items-center gap-2 text-zinc-600">
            {phone && (
              <div className="flex items-center gap-2 text-zinc-600">
                <Phone size={20} className="print:hidden" />
                <span className="print:text-[10px]">{phone}</span>
              </div>
            )}
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2 text-zinc-600">
            <Mail size={20} className="print:hidden" />
            <span className="text-sm print:text-[10px]">{email}</span>
          </div>
        )}
        {street && (
          <div className="flex gap-2 text-zinc-600 print:gap-0">
            <Home size={42} className="-mt-3 print:hidden" />
            <div className="flex gap-x-2 gap-y-1 flex-wrap -mt-0.5 print:gap-y-0">
              {street && (
                <p className="w-full text-sm print:text-[8px]">{street}</p>
              )}
              {city && <p className="text-sm print:text-[8px]">{city}</p>}
              {city && <p className="text-sm print:text-[8px]">|</p>}
              {state && <p className="text-sm print:text-[8px]">{state}</p>}
              {city && <p className="text-sm print:text-[8px]">|</p>}
              {zip && <p className="text-sm print:text-[8px]">{zip}</p>}
              {country && (
                <p className="w-full text-sm print:text-[8px]">{country}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        {socialNetworks?.map((social) => (
          <div className="" key={social.id}>
            {social?.name.includes("Github") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaGithub size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
            {social?.name.includes("LinkedIn") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaLinkedinIn size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
            {social?.name.includes("Facebook") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaFacebook size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
            {social?.name.includes("Twitter") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaXTwitter size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
            {social?.name.includes("Insta") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaInstagram size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
            {social?.name.includes("YouTube") && (
              <div className="flex items-center gap-x-2 text-sm print:text-xs">
                <FaYoutube size={14} className="print:hidden" />
                <a
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="print:hidden"
                >
                  {social?.name}
                </a>
                <span className="hidden print:block text-[8px]">
                  {social.url.slice(8)}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WorkExperienceProps {}

export function WorkExperience({}: WorkExperienceProps) {
  return (
    <div className={cn(" pl-20 font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase">Work Experience</h3>
      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex flex-col text-zinc-600 text-sm">
          <h4 className=" uppercase font-semibold">Full Stack Developer</h4>
          <small>Vera Cruz Group · Freelance</small>
          <small>May 2024 - Present · 3 mos</small>
          <small>London Area, United Kingdom · Remote</small>
        </div>
        <p className="text-sm leading-relaxed text-balance whitespace-nowrap print:leading-snug">
          I developed intuitive and responsive user interfaces using Next.js and
          React, alongside a mobile application utilizing React Native and Expo,
          to deliver a seamless navigation experience for customers. On the
          backend, I engineered and managed authentication processes with
          Node.js, Prisma, and MySQL, ensuring robust protection of user data
          and efficient login and registration operations. I integrated
          authentication and authorization APIs, strictly adhering to best
          security practices. For state management, I utilized Zustand to handle
          global state efficiently. I designed and implemented forms with React
          Hook Form, incorporated validations using Zod, and used Resend for
          email submissions. Additionally, I developed multi-language
          functionality (Internationalization) using i18n to cater to a diverse
          user base. Explore more about the project here: VCA Invest -
          <a href="https://vcainvest.com">VCAinvest</a>
        </p>
      </div>
      <div className="flex flex-col mt-6 space-y-4">
        <div className="flex flex-col text-zinc-600 text-sm">
          <h4 className=" uppercase font-semibold">Full Stack Developer</h4>
          <small>Rádio Sintoniza-T - Volunteering</small>
          <small>Mar 2022 - Present · 2 yrs 5 mos</small>
          <small>Sintra | Portugal · Remote</small>
        </div>
        <p className="text-sm leading-relaxed text-balance whitespace-nowrap print:leading-snug">
          Responsible for the development of the entire Sintoniza-T Radio
          website, including the user interface with Next.js and React, and the
          backend with Strapi (CMS) and MySQL, enabling clients to have full
          autonomy to modify all site content. Over time, the site has
          experienced several versions and technology updates, including React,
          Next.js, Strapi, Prisma, PostgreSQL, and MongoDB.
          <a href="https://sintoniza-t.pt">Sintoniza-t</a>
        </p>
      </div>
    </div>
  )
}

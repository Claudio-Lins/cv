import { About } from "@/components/about.tsx"
import { Contacts } from "@/components/contacts"
import { Name } from "@/components/name"
import { Role } from "@/components/role"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { Separator } from "@/components/ui/separator"
import { Education } from "@/components/education"
import { WorkExperience } from "@/components/work-experiense"

export default async function Home() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()
  return (
    <main className="flex min-h-screen h-full w-full max-w-7xl mt-28 flex-col bg-zinc-50 rounded-lg shadow-lg items-center px-16 print:mt-0 print:px-0">
      <Name
        picture={false}
        pictureUrl={user?.picture || ""}
        firstName="Claudio"
        lastName="Lins"
      />
      <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
      <Role role="Software Engineer" />
      <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
      <div className="my-14 min-h-10 justify-between flex items-stretch w-full">
        <div className="w-1/3">
          <Contacts />
        </div>
        <div className="w-px min-h-full bg-gradient-to-b from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <div className="flex-1">
          <About />
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
      <div className="my-14 min-h-10 justify-between flex items-stretch w-full">
        <div className="w-1/3">
          <Education />
        </div>
        <div className="w-px min-h-full bg-gradient-to-b from-zinc-300/10 via-zinc-500 to-zinc-400/10" />
        <div className="flex-1">
          <WorkExperience />
        </div>
      </div>
    </main>
  )
}

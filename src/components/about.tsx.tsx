import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface AboutProps {}

export function About({}: AboutProps) {
  return (
    <div className={cn(" pl-10 font-light text-zinc-600 tracking-widest ")}>
      <h3 className=" uppercase">About</h3>
      <ScrollArea className="mt-6 pb-2 h-48 text-zinc-600 text-sm leading-relaxed text-balance whitespace-nowrap print:leading-snug print:h-full">
        <div className="flex flex-col gap-2">
          <p className="">
            I&apos;ve always been passionate about technology, studying and
            creating projects daily to become an excellent Software Engineer.
            Currently, my focus is on Front-end development. Leveraging my
            background as a photographer and designer, I delight in crafting
            visually stunning user interfaces.
            <br />
            <br /> I&apos;m already capable of developing a complete project,
            both on the frontend using React, React Native, Next, Typescript and
            CSS as Tailwind CSS, and on the backend using Node.js, Prisma, and
            CMS like Hygraph and Strapi. I have advanced English skills,
            acquired during the three years I lived in the United States and
            also through studies at the University of Georgia.
            <br />
            <br /> Additionally, I have a rich experience of over 20 years in
            artwork photography, having worked in major agencies in São Paulo. I
            believe my ability to transform an offline project (graphic layout
            in Figma, Illustrator, Photoshop) into a web app/site is a unique
            combination of technical and creative skills.
          </p>
        </div>
      </ScrollArea>
    </div>
  )
}

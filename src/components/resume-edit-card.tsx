import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ResumeEditCardProps {
  id: string
  title: string
  active: boolean
}
export function ResumeEditCard({ title, active, id }: ResumeEditCardProps) {
  return (
    <Card className={cn("")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{active ? "Active" : "Inactive"}</CardDescription>
      </CardHeader>
    </Card>
  )
}

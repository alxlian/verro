import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book } from "lucide-react"
import Link from "next/link"

interface Module {
  id: string
  title: string
  description: string
  progress: number
}

interface ModuleListProps {
  modules: Module[]
}

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <Link href={`/module/${module.id}`} key={module.id}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-4">
              <Book className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">Progress: {module.progress}%</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}


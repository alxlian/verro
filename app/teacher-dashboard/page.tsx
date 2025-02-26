"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PDFUploadModal } from "@/components/pdf-upload-modal"
import { Plus, Upload, Sigma, Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { Pagination } from "@/components/ui/pagination"

interface Module {
  id: string
  title: string
  description: string
  lesson_count: number
  created_at: string
  updated_at: string
  icon: React.ReactNode
  difficulty: string
  estimated_time: string
}

interface Student {
  id: string
  name: string
  coursesCompleted: number
  lastUsed: string
}

export default function TeacherDashboard() {
  const [modules, setModules] = useState<Module[]>([])
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false)
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const studentsPerPage = 5

  useEffect(() => {
    const fetchModules = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      // Simulated data for the demo
      const demoModules: Module[] = [
        {
          id: "calculus",
          title: "Calculus",
          description: "Learn differentiation, integration, and their applications in solving complex problems.",
          lesson_count: 1,
          created_at: "2023-06-05",
          updated_at: "2023-06-20",
          icon: <Sigma className="w-6 h-6 text-primary" />,
          difficulty: "Advanced",
          estimated_time: "48 hours",
        },
      ]

      setModules(demoModules)
    }

    fetchModules()
  }, [router])

  useEffect(() => {
    // Simulated data for the demo with 20 students and fake names
    const demoStudents: Student[] = [
      { id: "student-1", name: "Emma Thompson", coursesCompleted: 85, lastUsed: "2d ago" },
      { id: "student-2", name: "Liam Rodriguez", coursesCompleted: 72, lastUsed: "1d ago" },
      { id: "student-3", name: "Olivia Chen", coursesCompleted: 93, lastUsed: "3d ago" },
      { id: "student-4", name: "Noah Patel", coursesCompleted: 68, lastUsed: "5d ago" },
      { id: "student-5", name: "Ava Williams", coursesCompleted: 79, lastUsed: "1w ago" },
      { id: "student-6", name: "Ethan Johnson", coursesCompleted: 88, lastUsed: "2d ago" },
      { id: "student-7", name: "Sophia Garcia", coursesCompleted: 76, lastUsed: "4d ago" },
      { id: "student-8", name: "Mason Lee", coursesCompleted: 91, lastUsed: "1d ago" },
      { id: "student-9", name: "Isabella Kim", coursesCompleted: 83, lastUsed: "3d ago" },
      { id: "student-10", name: "William Brown", coursesCompleted: 70, lastUsed: "6d ago" },
      { id: "student-11", name: "Mia Davis", coursesCompleted: 95, lastUsed: "2d ago" },
      { id: "student-12", name: "James Wilson", coursesCompleted: 81, lastUsed: "1w ago" },
      { id: "student-13", name: "Charlotte Moore", coursesCompleted: 87, lastUsed: "3d ago" },
      { id: "student-14", name: "Benjamin Taylor", coursesCompleted: 74, lastUsed: "4d ago" },
      { id: "student-15", name: "Amelia Anderson", coursesCompleted: 89, lastUsed: "1d ago" },
      { id: "student-16", name: "Lucas Martinez", coursesCompleted: 78, lastUsed: "5d ago" },
      { id: "student-17", name: "Harper Thomas", coursesCompleted: 92, lastUsed: "2d ago" },
      { id: "student-18", name: "Alexander White", coursesCompleted: 86, lastUsed: "3d ago" },
      { id: "student-19", name: "Evelyn Harris", coursesCompleted: 73, lastUsed: "1w ago" },
      { id: "student-20", name: "Daniel Clark", coursesCompleted: 80, lastUsed: "4d ago" },
    ]

    setStudents(demoStudents)
  }, [])

  const handlePDFUpload = async (file: File) => {
    console.log("Uploading PDF:", file.name)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setIsPDFModalOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Upload PDF
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Module
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-4">Your Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <Link href={`/teacher-dashboard/module/${module.id}`} key={module.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      {module.icon}
                    </div>
                    <div>
                      <CardTitle>{module.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">COURSE</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" /> {module.lesson_count} lesson
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {module.estimated_time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <span>{module.difficulty}</span>
                      <span>•</span>
                      <span>Last updated: {new Date(module.updated_at).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Student Engagement</h2>
          <div className="space-y-4">
            {students.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage).map((student) => (
              <div key={student.id} className="flex justify-between items-center p-2 border-b">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">Last active: {student.lastUsed}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{student.coursesCompleted}%</p>
                  <p className="text-sm text-muted-foreground">Courses completed</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(students.length / studentsPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      <PDFUploadModal isOpen={isPDFModalOpen} onClose={() => setIsPDFModalOpen(false)} onFileUpload={handlePDFUpload} />
    </div>
  )
}


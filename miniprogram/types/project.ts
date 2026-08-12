export type ProjectCategory =
  | 'AI'
  | 'Web'
  | 'Tool'
  | 'Experiment'
  | 'MiniProgram'
  | 'Other'

export interface Project {
  id: string
  slug: string
  title: string
  summary: string
  description?: string
  category: ProjectCategory
  tags: string[]
  featured: boolean
  coverImage?: string
  externalUrl?: string
  createdAt?: string
  updatedAt?: string
}


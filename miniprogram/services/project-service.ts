import { projects } from '../data/projects'
import type { Project, ProjectCategory } from '../types/project'

const allCategory = 'All'

export type ProjectFilterCategory = ProjectCategory | typeof allCategory

export const ProjectService = {
  getProjects(): Project[] {
    return projects
  },

  getFeaturedProjects(): Project[] {
    return projects.filter((project) => project.featured)
  },

  getProjectById(id?: string): Project | undefined {
    if (!id) {
      return undefined
    }

    return projects.find((project) => project.id === id || project.slug === id)
  },

  getCategories(): ProjectFilterCategory[] {
    const categories = projects.map((project) => project.category)
    return [allCategory, ...Array.from(new Set(categories))]
  },

  getProjectsByCategory(category: ProjectFilterCategory): Project[] {
    if (category === allCategory) {
      return projects
    }

    return projects.filter((project) => project.category === category)
  },
}


import { ProjectService, type ProjectFilterCategory } from '../../services/project-service'
import type { Project } from '../../types/project'

interface ProjectsData {
  categories: ProjectFilterCategory[]
  activeCategory: ProjectFilterCategory
  projects: Project[]
  hasProjects: boolean
}

Page<ProjectsData, Record<string, unknown>>({
  data: {
    categories: [],
    activeCategory: 'All',
    projects: [],
    hasProjects: false,
  },

  onLoad() {
    const categories = ProjectService.getCategories()
    const projects = ProjectService.getProjects()

    this.setData({
      categories,
      projects,
      hasProjects: projects.length > 0,
    })
  },

  onCategoryTap(event: { currentTarget: { dataset: { category: ProjectFilterCategory } } }) {
    const activeCategory = event.currentTarget.dataset.category
    const projects = ProjectService.getProjectsByCategory(activeCategory)

    this.setData({
      activeCategory,
      projects,
      hasProjects: projects.length > 0,
    })
  },

  onProjectTap(event: { detail: { id: string } }) {
    wx.navigateTo({
      url: `/pages/project-detail/project-detail?id=${event.detail.id}`,
    })
  },
})


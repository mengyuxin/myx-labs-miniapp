import { ProfileService } from '../../services/profile-service'
import { ProjectService } from '../../services/project-service'
import type { Profile } from '../../types/profile'
import type { Project } from '../../types/project'

interface HomeData {
  profile: Profile
  featuredProjects: Project[]
  hasFeaturedProjects: boolean
}

Page<HomeData, Record<string, unknown>>({
  data: {
    profile: ProfileService.getProfile(),
    featuredProjects: [],
    hasFeaturedProjects: false,
  },

  onLoad() {
    const featuredProjects = ProjectService.getFeaturedProjects()

    this.setData({
      featuredProjects,
      hasFeaturedProjects: featuredProjects.length > 0,
    })
  },

  onProjectTap(event: { detail: { id: string } }) {
    wx.navigateTo({
      url: `/pages/project-detail/project-detail?id=${event.detail.id}`,
    })
  },

  onExploreProjects() {
    wx.switchTab({
      url: '/pages/projects/projects',
    })
  },
})


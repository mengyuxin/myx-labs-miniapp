import { ProjectService } from '../../services/project-service'
import type { Project } from '../../types/project'

interface ProjectDetailData {
  project: Project | null
  isFound: boolean
  hasCoverImage: boolean
  hasTags: boolean
  hasExternalUrl: boolean
}

Page<ProjectDetailData, Record<string, unknown>>({
  data: {
    project: null,
    isFound: true,
    hasCoverImage: false,
    hasTags: false,
    hasExternalUrl: false,
  },

  onLoad(query?: { id?: string }) {
    const project = ProjectService.getProjectById(query?.id)

    if (!project) {
      this.setData({
        project: null,
        isFound: false,
        hasCoverImage: false,
        hasTags: false,
        hasExternalUrl: false,
      })
      return
    }

    this.setData({
      project,
      isFound: true,
      hasCoverImage: Boolean(project.coverImage),
      hasTags: project.tags.length > 0,
      hasExternalUrl: Boolean(project.externalUrl),
    })
  },

  onCopyExternalUrl() {
    const externalUrl = this.data.project?.externalUrl

    if (!externalUrl) {
      return
    }

    wx.setClipboardData({
      data: externalUrl,
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success',
        })
      },
      fail: () => {
        wx.showToast({
          title: '复制失败',
          icon: 'none',
        })
      },
    })
  },

  onCoverError() {
    this.setData({
      hasCoverImage: false,
    })
  },

  onBackToProjects() {
    wx.switchTab({
      url: '/pages/projects/projects',
    })
  },
})

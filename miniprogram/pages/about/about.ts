import { ProfileService } from '../../services/profile-service'
import type { Profile } from '../../types/profile'

interface AboutData {
  profile: Profile
  hasWebsite: boolean
}

Page<AboutData, Record<string, unknown>>({
  data: {
    profile: ProfileService.getProfile(),
    hasWebsite: Boolean(ProfileService.getProfile().website),
  },

  onCopyWebsite() {
    const website = this.data.profile.website

    if (!website) {
      return
    }

    wx.setClipboardData({
      data: website,
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
})


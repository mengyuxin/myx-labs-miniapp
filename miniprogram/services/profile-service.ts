import { profile } from '../data/profile'
import type { Profile } from '../types/profile'

export const ProfileService = {
  getProfile(): Profile {
    return profile
  },
}


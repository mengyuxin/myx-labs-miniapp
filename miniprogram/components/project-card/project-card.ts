Component({
  properties: {
    project: {
      type: Object,
      value: null,
      observer(project: { coverImage?: string } | null) {
        this.setData({
          hasCoverImage: Boolean(project?.coverImage),
        })
      },
    },
  },

  data: {
    hasCoverImage: false,
  },

  methods: {
    onTapProject() {
      const project = this.data.project

      if (!project || typeof project !== 'object' || !('id' in project)) {
        return
      }

      this.triggerEvent('projecttap', { id: String(project.id) })
    },

    onCoverError() {
      this.setData({
        hasCoverImage: false,
      })
    },
  },
})

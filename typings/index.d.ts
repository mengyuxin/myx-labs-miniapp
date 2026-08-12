declare const wx: {
  navigateTo(options: { url: string }): void
  switchTab(options: { url: string }): void
  navigateBack(options?: { delta?: number }): void
  setClipboardData(options: { data: string; success?: () => void; fail?: () => void }): void
  showToast(options: { title: string; icon?: 'success' | 'error' | 'loading' | 'none'; duration?: number }): void
}

declare function App(options: Record<string, unknown>): void

interface MiniProgramPageInstance<TData extends object> {
  data: TData
  setData(data: Partial<TData>): void
}

declare function Page<TData extends object, TMethods extends object>(
  options: TMethods & {
    data?: TData
    onLoad?: (query?: Record<string, string | undefined>) => void
  } & ThisType<MiniProgramPageInstance<TData>>,
): void

interface MiniProgramComponentInstance {
  data: Record<string, unknown>
  setData(data: Record<string, unknown>): void
  triggerEvent(name: string, detail?: Record<string, unknown>): void
}

declare function Component(options: Record<string, unknown> & ThisType<MiniProgramComponentInstance>): void

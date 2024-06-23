export interface SettingStore {
  isLoading: boolean
  data: OrgaConfig
}

export const settingStore: SettingStore = {
  isLoading: false,
  data: {} as OrgaConfig,
}

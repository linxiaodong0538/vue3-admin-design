import storage, { StorageType } from '@/utils/storage'
import Keys from '@/constant/key'
import { UserDesc } from '@/model/userModel'

export interface UserState<T> {
  token: string
  userInfo: T
}

export const state: UserState<UserDesc> = {
  token: storage.rcGetItem(StorageType.local, Keys.tokenKey) || '',
  userInfo: {
    roleIds: '',
    permissions: [],
    headImgUrl: '',
    logoUrl: '',
    tenantId: '',
    nickName: '',  
    mobile: '',
    username: ''
  }
}
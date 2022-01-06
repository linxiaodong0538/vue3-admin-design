export interface UserInfoModel <T> {
  code: number
  data: T
}

export interface UserDesc {
  permissions: string[];
  roleIds: string;
  headImgUrl: string
  logoUrl: string
  tenantId: string
  nickName: string
  mobile: string
  username: string
}

export interface Users {
  items: any
}

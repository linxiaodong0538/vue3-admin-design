/*
 * @Description:
 * @Author: ZY
 * @Date: 2020-12-29 09:05:40
 * @LastEditors: Lx
 * @LastEditTime: 2021-09-26 10:36:09
 */

export interface RootObject<T> {
  code: number
  msg: string
  data: T
}

export interface RootData<T> {
  code: number
  msg: string | null
  rows: T
  total: number
}

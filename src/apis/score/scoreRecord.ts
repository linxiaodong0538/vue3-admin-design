/*
 * @Author: XNY
 * @Date: 2021-09-22 09:44:11
 * @LastEditTime: 2021-10-11 11:55:24
 * @LastEditors: XNY
 * @Description:
 * @FilePath: \scs-ecocity-web\src\apis\score\scoreRecord.ts
 */
import https from '@/utils/https'
import { ContentType, Method } from 'axios-mapper'
import { RootData, RootObject } from './../../model/rootObject'
import qs from 'qs'

/** 记录列表 */
export const getList = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/score/score-record',
    Method.GET,
    data,
    ContentType.form
  )
}

/** 修改 /api-ecocity/v1/score/score-record */
export const scoreRecordUpdate = (data?: any) => {
  return https().request<RootObject<any>>(
    '/api-ecocity/v1/score/score-record',Method.PUT,data,ContentType.json
  )
}

/** 删除 */
export const scoreRecordRemove = ({ids}:any) => {  
  return https().request<RootObject<any>>(
    `/api-ecocity/v1/score/score-record/batch?${qs.stringify({ ids: ids }, { arrayFormat: 'brackets' })}`,
    Method.DELETE,
    undefined,
    ContentType.form
  )
}
/** 保存并获取结果  */
export const saveGet = (data?: any) => {
  return https().request<RootData<any>>(
    '/api-ecocity/v1/score/score-record/saveGet',
    Method.POST,
    data,
    ContentType.json
  )
}

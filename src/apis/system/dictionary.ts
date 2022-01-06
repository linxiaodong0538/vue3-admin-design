/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 * 
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 *            佛祖保佑       永不宕机     永无BUG
 * 
 * @Author: XNY
 * @Date: 2021-10-08 16:42:44
 * @LastEditTime: 2021-10-08 16:54:15
 * @LastEditors: XNY
 * @Description: 
 * @FilePath: \scs-ecocity-web\src\apis\system\dictionary.ts
 */

import https from '@/utils/https'
// import { ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { RemoteRoute, TopMenu } from '@/model/remoteRouteModel'
import { Method,ContentType } from 'axios-mapper'
export const getDictionary = (params:any) => {
  return https().request<RootObject<TopMenu[]>>(`/api-sys/v1/dict/dictionary`,Method.GET, params,ContentType.form)
}
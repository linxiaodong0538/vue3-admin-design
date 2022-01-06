/*
 * @Description:
 * @Author: Lx
 * @Date: 2021-09-23 13:46:53
 * @LastEditors: Lx
 * @LastEditTime: 2021-10-08 12:10:20
 */
import Mock from 'mockjs'

const data = Mock.mock('/api/map', {
  'array|40-80': [
    {
      'type|1-6': 1,
      'lng|115.6': 115,
      'lat|34.6': 34,
      
    }
  ]
})

Mock.mock('/api/map', 'get', data)

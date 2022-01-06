<template>
  <div class="container">
    <el-card class="box-card">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="form">
        <el-col :span="24">
          <div class="form-inner">
            <span>商丘市 智慧园林管理平台</span>
            <!-- <img class="img" src="../../assets/image/login_img_title.png" /> -->
            <el-form-item prop="tenantId" class="item">
              <el-input
                v-model="loginForm.tenantId"
                prefix-icon="el-icon-user"
                placeholder="请输入租户ID"
              ></el-input>
            </el-form-item>
            <el-form-item prop="username" class="item">
              <el-input
                v-model="loginForm.username"
                prefix-icon="el-icon-house"
                placeholder="请输入账号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" class="item">
              <el-input
                v-model="loginForm.password"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                show-password
              ></el-input>
            </el-form-item>
            <div class="inline-item">
              <el-form-item prop="validCode" class="item">
                <el-input
                  v-model="loginForm.validCode"
                  class="input"
                  prefix-icon="el-icon-circle-check"
                  placeholder="请输入验证码"
                  @keyup.enter="handleLogin()"
                ></el-input>
                <img class="img-code" :src="loginForm.image" @click="refreshCode()" />
              </el-form-item>
            </div>
            <el-checkbox v-model="remember" class="remember">记住密码</el-checkbox>
            <el-button type="primary" class="button" @click="handleLogin()">登录</el-button>
          </div>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch, reactive, toRefs, ref, onMounted } from 'vue'
import { useRoute, LocationQuery, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { UserActionTypes } from '@/store/modules/user/action-types'
import { firstMenus } from '@/utils/routeHelper'

import uuid from './uuid'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const loginFormRef = ref(null)
    const menu = computed(() => {
      return store
    })

    const state = reactive({
      loading: false,
      remember: false,
      redirect: '',
      otherQuery: {},
      loginForm: {
        tenantId: '',
        username: '',
        password: '',
        validCode: '',
        deviceId: '',
        image: ''
      },
      loginRules: {
        tenantId: [
          {
            required: true,
            message: '请输入租户ID',
            trigger: 'blur'
          }
        ],
        username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        validCode: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    })

    const refreshCode = () => {
      state.loginForm.deviceId = uuid()
      state.loginForm.image = '/api/api-ua/validata/code/' + state.loginForm.deviceId
    }
    const handleLogin = () => {
      (loginFormRef.value as any).validate(async (valid: boolean) => {
        if (valid) {
          // ElLoading.service()
          const params = Object.assign({}, state.loginForm)
          console.log('loginFormRef', loginFormRef.value)
          store
            .dispatch(UserActionTypes.ACTION_LOGIN, params)
            .then(() => {
              console.log('srore', store)
              const menus = store.state.permission.dynamicRoutes
              const src = firstMenus(menus)
              router.push({
                path: '/navPage' || '/',
                query: state.otherQuery
              })
            })
            .catch(() => {
              refreshCode()
            })
        }
      })
    }
    function getOtherQuery(query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as LocationQuery)
    }

    watch(
      () => route.query,
      query => {
        if (query) {
          console.log('query', query)
          state.redirect = query.redirect?.toString() ?? ''
          state.otherQuery = getOtherQuery(query)
        }
      }
    )

    onMounted(() => {
      refreshCode()
    })
    return { menu, loginFormRef, refreshCode, handleLogin, ...toRefs(state) }
  },
  created() { }
})
</script>
<style lang="scss" scoped>
.container {
  background: url("../../assets/image/pexels-visually-us-1643402.png") no-repeat
    center;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    height: auto;
    .form {
      padding: 0;
      width: 100%;
      height: 440px;
      .img {
        width: 100%;
        height: 440px;
      }
      .form-inner {
        background-color: #fff;

        height: calc(440px - 1.75em);
        text-align: center;
        padding: 1.75em 1.5em 0;
        .img {
          width: 75%;
          height: 38px;
        }
        .item {
          margin: 1.3rem;
        }
        .inline-item {
          display: inline;
          width: 100%;
          .input {
            float: left;
            width: 68%;
          }
          .img-code {
            float: right;
            width: 30%;
            height: 2.5em;
            cursor: pointer;
          }
        }
      }
      .remember {
        margin-left: 1.5rem;
        float: left;
      }
      .button {
        margin: 1.5rem;
        width: calc(100% - 3rem);
        background: #054e43;
        border-radius: 20px;
        border: 0;
      }
    }
  }
}
</style>

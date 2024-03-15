<script setup>
import { userRegisterService, userLoginService } from '@/api/user.js'
import { User, View, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const formTransform = ref('translateX(0)')
const isRegister = ref(false)
const form = ref()
const toLogin = () => {
  if (formTransform.value === 'translateX(0)') {
    formTransform.value = 'translateX(100%)'
  } else {
    formTransform.value = 'translateX(0)'
    isRegister.value = false
  }
}
const toRegister = () => {
  if (formTransform.value === 'translateX(100%)') {
    formTransform.value = 'translateX(0)'
  } else {
    formTransform.value = 'translateX(100%)'
    isRegister.value = true
  }
}
// 注册
const fromModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是 2-10 位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,8}$/,
      message: '密码必须是 6-8 位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,8}$/,
      message: '密码必须是 6-8 位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断
        if (value !== fromModel.value.password) {
          callback(new Error('两次输入的密码不一致，请重新输入'))
        } else {
          callback()
        }
      }
    }
  ]
}
const register = async () => {
  // 注册成果之前进行校验
  await form.value.validate()

  try {
    const response = await userRegisterService(fromModel.value)
    if (response.code === 1) {
      // 如果返回的错误代码是1，表示用户名被占用
      alert(response.message) // 显示错误信息
    } else {
      // 假设其他情况表示注册成功
      alert('注册成功')
      isRegister.value = false
      formTransform.value = 'translateX(0)'
    }
  } catch (error) {
    // 处理其他可能的错误情况
    console.error('注册时发生错误:', error)
    alert('用户名被占用，请更换其他用户名')
  }
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()

  try {
    const res = await userLoginService(fromModel.value)
    if (res.code === 1) {
      // 如果返回的错误代码是1，表示登录失败
      alert(res.message) // 显示错误信息
    } else {
      // 假设其他情况表示登录成功
      alert('登录成功')
      userStore.setToken(res.data.token)
      router.push('/Book/HotBook/HotBook')
    }
  } catch (error) {
    // 处理其他可能的错误情况
    console.error('登录时发生错误:', error)
    alert('登录失败，没有该用户，请去注册')
  }
}
watch(isRegister, () => {
  fromModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <div class="box">
    <div class="container">
      <div class="form-box" :style="{ transform: formTransform }">
        <!-- 注册 -->
        <el-form
          class="register-box"
          v-if="isRegister"
          :model="fromModel"
          :rules="rules"
          ref="form"
        >
          <h1>register</h1>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              type="text"
              placeholder="用户名"
              v-model="fromModel.username"
              class="input"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :prefix-icon="View"
              type="password"
              placeholder="密码"
              class="input"
              v-model="fromModel.password"
            />
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              :prefix-icon="Lock"
              type="password"
              placeholder="确认密码"
              class="input"
              v-model="fromModel.repassword"
            />
          </el-form-item>
          <el-button @click="register" class="btn">注册</el-button>
        </el-form>
        <!-- 登录 -->
        <el-form
          class="login-box"
          v-else
          ref="form"
          :model="fromModel"
          :rules="rules"
        >
          <h1>login</h1>
          <el-form-item prop="username">
            <el-input
              v-model="fromModel.username"
              :prefix-icon="User"
              type="text"
              placeholder="用户名"
              class="input"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="fromModel.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="密码"
              class="input"
            />
          </el-form-item>
          <div class="flex">
            <el-checkbox class="remember">记住我</el-checkbox>
            <el-link class="remember-password">忘记密码？</el-link>
          </div>
          <el-button class="btn" @click="login">登录</el-button>
        </el-form>
      </div>
      <!-- 底部盒子左边 -->
      <div class="con-box left">
        <h2>欢迎来到<span>卷中世界</span></h2>
        <p>快来查看更多的<span>书籍</span>吧</p>
        <img src="../../assets/a.jpg" alt="" />
        <p>已有账号</p>
        <el-button @click="toLogin" class="btn1">去登录</el-button>
      </div>
      <!-- 底部盒子右边 -->
      <div class="con-box right">
        <h2>欢迎来到<span>卷中世界</span></h2>
        <p>快来查看更多的<span>书籍</span>吧</p>
        <img src="../../assets/a.jpg" alt="" />
        <p>已有账号</p>
        <el-button @click="toRegister" class="btn1">去注册</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #f3e7e9, #e3eeff);
}
.con-box img {
  width: 170px;
  height: 150px;
  opacity: 0.9;
  margin: 10px 0;
}
.container {
  width: 650px;
  height: 415px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}
.form-box {
  position: absolute;
  top: -30px;
  left: 6%;
  background-color: #d3b7d8;
  width: 300px;
  height: 450px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  transition: 0.5s ease-in-out;
}
.hidden {
  display: none;
  transition: 0.5s;
}
h1 {
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 5px;
}
.input {
  color: #fff;
  text-indent: 10px;
  font-size: 14px;
  margin-top: 30px;
}
.input ::placeholder {
  color: #d3b7d8;
}
.input :focus::placeholder {
  opacity: 0;
}
.form-box {
  width: 40%;
  margin-top: 3px;
  outline: none;
  border-radius: 8px;
  padding: 13px;
  color: #a262ad;
  letter-spacing: 2px;
  border: none;
  cursor: pointer;
}
.con-box {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.con-box.left {
  left: 10%;
}
.con-box.right {
  left: 60%;
}
.btn {
  margin-top: 30px;
  margin-left: 3px;
  align-items: center;
  width: 250px;
  height: 30px;
  background-color: #fff;
  color: #a262ad;
  transition: ackground-color 0.5s ease;
  border: none;
  font-weight: 700;
  border-radius: 4px;
  font-size: 15px;
}
.btn1 {
  background-color: #fff;
  border: none;
  font-size: 15px;
  font-weight: 700;
}
.con-box h2 {
  width: 300px;
  font-size: 25px;
  color: #8e9aa8;
  font-weight: 700;
  text-align: center;
  margin-top: 30px;
}
.con-box p {
  font-size: 18px;
  color: #6a6f79;
  font-weight: 700;
  text-align: center;
  margin: 15px;
}
.con-box span {
  color: #cda7d4;
}
.flex {
  margin-top: 30px;
}
.remember {
  margin-left: 30px;
}
.remember-password {
  margin-left: 160px;
  margin-top: -55px;
  color: #953ac9;
}
</style>

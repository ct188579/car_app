<template>
  <div class="login-page">
    <div class="login-header">
      <h1>欢迎使用</h1>
      <p>智能充电，畅享出行</p>
    </div>

    <div class="login-form">
      <van-field
        v-model="form.username"
        placeholder="请输入手机号"
        :border="false"
        class="input-field"
      >
        <template #left-icon>
          <span class="input-icon">📱</span>
        </template>
      </van-field>

      <van-field
        v-model="form.password"
        type="password"
        placeholder="请输入密码"
        :border="false"
        class="input-field"
      >
        <template #left-icon>
          <span class="input-icon">🔒</span>
        </template>
      </van-field>

      <van-button
        type="primary"
        block
        :loading="loading"
        @click="handleLogin"
        class="login-btn"
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import { showToast } from 'vant'

const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const loading = ref(false)

const handleLogin = async () => {
  if (!form.value.username) {
    showToast('请输入手机号')
    return
  }
  if (!form.value.password) {
    showToast('请输入密码')
    return
  }

  loading.value = true
  try {
    const res = await login(form.value) as unknown as { token: string }
    localStorage.setItem('token', res.token)
    localStorage.setItem('phone', form.value.username)
    showToast('登录成功')
    router.replace('/home')
  } catch (error: any) {
    showToast(error.response?.data?.msg || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(145deg, #0a0f1a 0%, #111827 50%, #0d1520 100%);
  display: flex;
  flex-direction: column;
  padding: 60px 30px 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 60px;
}

.login-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #e8f4ff;
  margin-bottom: 8px;
}

.login-header p {
  font-size: 14px;
  color: #4a7a9b;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-field {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 14px 16px;
}

.input-field :deep(.van-field__control) {
  color: #e8f4ff;
}

.input-field :deep(.van-field__placeholder) {
  color: rgba(255, 255, 255, 0.3);
}

.input-icon {
  font-size: 18px;
  margin-right: 8px;
}

.login-btn {
  margin-top: 20px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
}
</style>

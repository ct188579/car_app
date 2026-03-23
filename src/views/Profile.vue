<template>
  <div class="profile-page">
    <van-nav-bar title="我的" left-arrow />
    
    <div class="profile-header">
      <div class="avatar">👤</div>
      <div class="user-info" v-if="isLoggedIn">
        <h2>车主用户</h2>
        <p>手机: {{ phone }}</p>
      </div>
      <div class="user-info" v-else>
        <h2>未登录</h2>
        <p>登录后查看更多信息</p>
      </div>
    </div>
    
    <van-cell-group>
      <van-cell title="我的车辆" is-link />
      <van-cell title="我的订单" is-link />
      <van-cell title="钱包" is-link />
      <van-cell title="优惠券" is-link />
    </van-cell-group>
    
    <van-cell-group style="margin-top: 12px;">
      <van-cell title="设置" is-link />
      <van-cell title="帮助与反馈" is-link />
      <van-cell title="关于我们" is-link />
    </van-cell-group>
    
    <div class="logout-btn">
      <van-button 
        v-if="isLoggedIn" 
        type="default" 
        block 
        @click="handleLogout"
      >退出登录</van-button>
      <van-button 
        v-else 
        type="primary" 
        block 
        @click="goLogin"
      >立即登录</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const router = useRouter()

const isLoggedIn = ref(false)
const phone = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  const userPhone = localStorage.getItem('phone')
  if (token) {
    isLoggedIn.value = true
    phone.value = userPhone || '138****8888'
  }
})

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('phone')
  showToast('已退出登录')
  router.replace('/login')
}

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  height: 100%;
  background: #f5f5f5;
  overflow-y: auto;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
}

.avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin-right: 16px;
}

.user-info h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.user-info p {
  font-size: 14px;
  opacity: 0.7;
}

.logout-btn {
  padding: 20px;
}
</style>
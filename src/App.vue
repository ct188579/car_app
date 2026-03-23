<template>
  <div id="app">
    <router-view />
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon>
          <span class="tab-icon">🏠</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/vehicle">
        <span>车辆</span>
        <template #icon>
          <span class="tab-icon">🚗</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/orders">
        <span>订单</span>
        <template #icon>
          <span class="tab-icon">📋</span>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/profile">
        <span>我的</span>
        <template #icon>
          <span class="tab-icon">👤</span>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#app {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
}

.tab-icon {
  font-size: 20px;
}
</style>
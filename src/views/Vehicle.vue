<template>
  <div class="vehicle-page">
    <van-nav-bar title="车辆管理" left-arrow />
    
    <div class="vehicle-info">
      <div class="car-image">
        <span>🚗</span>
      </div>
      <div class="car-details">
        <h2>小米 SU7 Max</h2>
        <p>车牌: 京A·12345</p>
      </div>
    </div>
    
    <van-cell-group>
      <van-cell title="车辆状态" value="在线" is-link />
      <van-cell title="当前电量" value="85%" is-link />
      <van-cell title="剩余续航" value="520km" is-link />
      <van-cell title="当前位置" value="查看地图" is-link />
    </van-cell-group>
    
    <van-cell-group style="margin-top: 12px;">
      <van-cell title="车辆设置" is-link />
      <van-cell title="远程控制" is-link />
      <van-cell title="保养记录" is-link />
      <van-cell title="保险信息" is-link />
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.vehicle-page {
  height: 100%;
  background: #f5f5f5;
  overflow-y: auto;
}

.vehicle-info {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
}

.car-image {
  width: 100px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-right: 16px;
}

.car-details h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.car-details p {
  font-size: 14px;
  opacity: 0.7;
}
</style>
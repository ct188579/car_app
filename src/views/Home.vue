<template>
  <div class="home-page">
    <div class="status-bar">
      <div class="stat-block">
        <span class="stat-label">剩余续航</span>
        <span class="stat-value">{{ range }}<small>km</small></span>
      </div>
      <div class="stat-block right">
        <span class="stat-label">当前电量</span>
        <div class="battery-row">
          <div class="battery-icon">
            <div class="battery-level" :style="{ width: batteryLevel + '%' }"></div>
          </div>
          <span class="battery-text">{{ batteryLevel }}%</span>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="dashboard">
        <div class="speed-display">
          <div class="speed-value">{{ currentSpeed }}</div>
          <div class="speed-unit">km/h</div>
        </div>
        
        <div class="gear-indicator">
          <span 
            v-for="g in ['P', 'R', 'N', 'D']" 
            :key="g"
            :class="{ active: currentGear === g }"
          >{{ g }}</span>
        </div>

        <div class="ring-container">
          <svg class="ring" viewBox="0 0 200 200">
            <defs>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#00d4ff" />
                <stop offset="100%" stop-color="#00ff88" />
              </linearGradient>
            </defs>
            <circle class="ring-bg" cx="100" cy="100" r="90" />
            <circle 
              class="ring-progress" 
              cx="100" cy="100" r="90" 
              :stroke-dasharray="565.48"
              :stroke-dashoffset="565.48 * (1 - batteryLevel / 100)"
            />
          </svg>
        </div>
      </div>

      <div class="info-cards">
        <div class="info-card">
          <div class="card-icon">⚡</div>
          <div class="card-info">
            <span class="card-label">瞬时功耗</span>
            <span class="card-value">{{ powerUsage }} <small>kWh/100km</small></span>
          </div>
        </div>
        <div class="info-card">
          <div class="card-icon">🅿️</div>
          <div class="card-info">
            <span class="card-label">驻车状态</span>
            <span class="card-value">{{ isParked ? '已驻车' : '行驶中' }}</span>
          </div>
        </div>
        <div class="info-card">
          <div class="card-icon">🔧</div>
          <div class="card-info">
            <span class="card-label">车辆状态</span>
            <span class="card-value normal">正常</span>
          </div>
        </div>
      </div>
    </div>

    <div class="controls">
      <button class="control-btn lock" :class="{ active: isLocked }" @click="toggleLock">
        <span class="btn-icon">{{ isLocked ? '🔒' : '🔓' }}</span>
        {{ isLocked ? '已锁车' : '解锁车辆' }}
      </button>
      <button class="control-btn trunk" :class="{ open: isTrunkOpen }" @click="toggleTrunk">
        <span class="btn-icon">🚗</span>
        {{ isTrunkOpen ? '关闭后备箱' : '开启后备箱' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const batteryLevel = ref(85);
const range = ref(520);
const currentSpeed = ref(0);
const currentGear = ref('P');
const powerUsage = ref(12.5);
const isParked = ref(true);
const isLocked = ref(true);
const isTrunkOpen = ref(false);

const toggleLock = () => {
  isLocked.value = !isLocked.value;
};

const toggleTrunk = () => {
  isTrunkOpen.value = !isTrunkOpen.value;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap');

.home-page {
  width: 100%;
  height: 100%;
  background: linear-gradient(145deg, #0a0f1a 0%, #111827 50%, #0d1520 100%);
  color: #e8f4ff;
  overflow: hidden;
  font-family: 'Rajdhani', -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  position: relative;
}

.home-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(0, 255, 136, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  z-index: 10;
  background: linear-gradient(180deg, rgba(8, 13, 20, 0.9) 0%, transparent 100%);
}

.stat-block {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-block.right {
  align-items: flex-end;
}

.stat-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  color: #4a7a9b;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #e8f4ff;
  line-height: 1;
  letter-spacing: -1px;
}

.stat-value small {
  font-size: 14px;
  font-weight: 500;
  color: #4a7a9b;
  margin-left: 4px;
}

.battery-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.battery-icon {
  width: 40px;
  height: 18px;
  border: 2px solid #00ff88;
  border-radius: 4px;
  padding: 2px;
  position: relative;
}

.battery-icon::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 8px;
  background: #00ff88;
  border-radius: 0 2px 2px 0;
}

.battery-level {
  height: 100%;
  background: linear-gradient(90deg, #00ff88, #00cc6a);
  border-radius: 1px;
  box-shadow: 0 0 12px rgba(0, 255, 136, 0.5);
  transition: width 0.5s ease;
}

.battery-text {
  font-size: 18px;
  font-weight: 700;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.4);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px 0;
  min-height: 0;
}

.dashboard {
  position: relative;
  width: 240px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.speed-value {
  font-size: 56px;
  font-weight: 700;
  color: #e8f4ff;
  line-height: 1;
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
}

.speed-display {
  position: absolute;
  text-align: center;
  z-index: 2;
}

.speed-unit {
  font-family: 'Share Tech Mono', monospace;
  font-size: 14px;
  color: #4a7a9b;
  letter-spacing: 3px;
}

.gear-indicator {
  position: absolute;
  bottom: 30px;
  display: flex;
  gap: 10px;
}

.gear-indicator span {
  font-family: 'Share Tech Mono', monospace;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.gear-indicator span.active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.2);
}

.ring-container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.05);
  stroke-width: 6;
}

.ring-progress {
  fill: none;
  stroke: url(#ringGradient);
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease;
}

.info-cards {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 12px 16px;
  flex: 1;
  min-width: 110px;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.2);
}

.card-icon {
  font-size: 24px;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.card-label {
  font-family: 'Share Tech Mono', monospace;
  font-size: 10px;
  color: #4a7a9b;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.card-value {
  font-size: 18px;
  font-weight: 600;
  color: #e8f4ff;
}

.card-value small {
  font-size: 12px;
  color: #4a7a9b;
}

.card-value.normal {
  color: #00ff88;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 12px 24px 60px;
  background: linear-gradient(0deg, rgba(8, 13, 20, 0.95) 0%, transparent 100%);
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e8f4ff;
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  min-width: 130px;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.control-btn.lock.active {
  background: rgba(0, 255, 136, 0.1);
  border-color: rgba(0, 255, 136, 0.4);
  color: #00ff88;
}

.control-btn.trunk.open {
  background: rgba(255, 107, 53, 0.1);
  border-color: rgba(255, 107, 53, 0.4);
  color: #ff6b35;
}

.btn-icon {
  font-size: 16px;
}
</style>

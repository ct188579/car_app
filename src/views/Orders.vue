<template>
  <div class="orders-page">
    <van-nav-bar title="我的订单" left-arrow />
    
    <div class="tabs">
      <div 
        v-for="tab in tabs" 
        :key="tab.value"
        :class="['tab-item', { active: activeTab === tab.value }]"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
      </div>
    </div>
    
    <div class="order-list">
      <div v-if="loading && orders.length === 0" class="loading-wrap">
        <van-loading size="24px">加载中...</van-loading>
      </div>
       
      <template v-else-if="filteredOrders.length > 0">
        <div 
          v-for="order in filteredOrders" 
          :key="order.chargingOrdersId" 
          class="order-item"
          @click="goToDetail(order.chargingOrdersId)"
        >
          <div class="order-header">
            <span class="order-no">{{ order.chargingOrdersNo }}</span>
            <van-tag :type="getStatusType(order)" size="medium">{{ getStatusText(order) }}</van-tag>
          </div>
          <div class="order-info">
            <span class="time">{{ order.beginTime || '-' }}</span>
            <span class="station">{{ order.chargingStationName || '-' }}</span>
          </div>
          <div class="order-footer" v-if="order.chargingOrdersType === 1">
            <van-button type="primary" size="small" @click.stop="endCharging(order.chargingOrdersId)">结束充电</van-button>
          </div>
          <div class="order-footer" v-else-if="order.chargingOrdersType === 2">
            <van-button type="warning" size="small" @click.stop="payOrder(order.chargingOrdersId)">支付</van-button>
          </div>
        </div>
      </template>
      
      <van-empty v-else description="暂无订单" />
      
      <div class="refresh-btn" v-if="!loading && orders.length > 0" @click="fetchOrders">
        <van-button size="small" type="primary" round>刷新</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getChargingOrders, type ChargingOrder } from '@/api/user'
import { showToast, showFailToast } from 'vant'

const router = useRouter()

const activeTab = ref('1')
const loading = ref(false)
const orders = ref<ChargingOrder[]>([])

const tabs = [
  { label: '进行中', value: '1' },
  { label: '待支付', value: '2' },
  { label: '已完成', value: '3' }
]

const processingOrders = computed(() => 
  orders.value.filter(o => o.chargingOrdersType === 1)
)

const pendingOrders = computed(() => 
  orders.value.filter(o => o.chargingOrdersType === 2)
)

const completedOrders = computed(() => 
  orders.value.filter(o => o.chargingOrdersType === 3)
)

const filteredOrders = computed(() => {
  if (activeTab.value === '1') return processingOrders.value
  if (activeTab.value === '2') return pendingOrders.value
  return completedOrders.value
})

const getStatusType = (order: ChargingOrder) => {
  if (order.chargingOrdersType === 1) return 'primary'
  if (order.chargingOrdersType === 2) return 'warning'
  return 'success'
}

const getStatusText = (order: ChargingOrder) => {
  return order.chargingOrdersTypeLable || '未知'
}

const goToDetail = (id: number) => {
  router.push(`/order-detail/${id}`)
}

const endCharging = (_id: number) => {
  showToast('结束充电功能开发中')
}

const payOrder = (_id: number) => {
  showToast('支付功能开发中')
}

const fetchOrders = async () => {
  loading.value = true
  try {
    const res = await getChargingOrders()
    orders.value = res.data?.data || []
  } catch (error: any) {
    console.error('获取订单失败:', error)
    showFailToast(error.response?.data?.msg || '获取订单失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrders()
})
</script>

<style scoped>
.orders-page {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs {
  display: flex;
  background: #fff;
  padding: 12px 16px;
  gap: 12px;
  flex-shrink: 0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  border-radius: 8px;
  background: #f5f5f5;
  cursor: pointer;
}

.tab-item.active {
  color: #fff;
  background: #1989fa;
}

.order-list {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.loading-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  color: #999;
}

.order-item {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.order-no {
  font-size: 14px;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-info .time {
  font-size: 13px;
  color: #999;
}

.order-info .station {
  font-size: 14px;
  color: #666;
}

.order-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.refresh-btn {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
</style>

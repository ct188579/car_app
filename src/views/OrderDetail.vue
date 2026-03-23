<template>
  <div class="order-detail-page">
    <van-nav-bar title="订单详情" left-arrow @click-left="goBack" />
    
    <div class="detail-content" v-if="order">
      <div class="status-card">
        <van-tag :type="getStatusType()" size="large">{{ order.chargingOrdersTypeLable || '未知' }}</van-tag>
        <span class="order-no">{{ order.chargingOrdersNo || `订单号: ${order.chargingOrdersId}` }}</span>
      </div>

      <div class="info-card">
        <div class="card-title">充电信息</div>
        <div class="info-row">
          <span class="label">充电站名称</span>
          <span class="value">{{ order.chargingStationName || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">充电桩名称</span>
          <span class="value">{{ order.chargingPileName || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">充电桩编号</span>
          <span class="value">{{ order.chargingPileNo || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">开始时间</span>
          <span class="value">{{ order.beginTime || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">结束时间</span>
          <span class="value">{{ order.endTime || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">已充电量</span>
          <span class="value highlight-num">{{ order.chargedQuantity ? order.chargedQuantity.toFixed(2) + ' kWh' : '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">充电时长</span>
          <span class="value">{{ formatDuration(order.chargingDuration) }}</span>
        </div>
        <div class="info-row" v-if="order.estimatedRemainingDuration">
          <span class="label">预计剩余时长</span>
          <span class="value">{{ formatDuration(order.estimatedRemainingDuration) }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="card-title">车辆信息</div>
        <div class="info-row">
          <span class="label">车辆牌照</span>
          <span class="value">{{ order.licenseTag || '-' }}</span>
        </div>
        <div class="info-row">
          <span class="label">车辆型号</span>
          <span class="value">{{ order.carModels || '-' }}</span>
        </div>
      </div>

      <div class="info-card">
        <div class="card-title">费用信息</div>
        <div class="info-row">
          <span class="label">订单总额</span>
          <span class="value price">¥{{ (order.totalOrderAmount || 0).toFixed(2) }}</span>
        </div>
        <div class="info-row" v-if="order.electricity">
          <span class="label">电量</span>
          <span class="value">{{ order.electricity.toFixed(2) }} kWh</span>
        </div>
        <div class="info-row" v-if="order.electricityCost">
          <span class="label">电费</span>
          <span class="value">¥{{ order.electricityCost.toFixed(2) }}</span>
        </div>
        <div class="info-row" v-if="order.serviceFee">
          <span class="label">服务费</span>
          <span class="value">¥{{ order.serviceFee.toFixed(2) }}</span>
        </div>
        <div class="info-row" v-if="order.pendingPaymentAmount && order.pendingPaymentAmount > 0">
          <span class="label">待支付金额</span>
          <span class="value price">¥{{ order.pendingPaymentAmount.toFixed(2) }}</span>
        </div>
        <div class="info-row" v-if="order.paidAmount">
          <span class="label">已支付金额</span>
          <span class="value">¥{{ order.paidAmount.toFixed(2) }}</span>
        </div>
        <div class="info-row" v-if="order.actualPaymentAmount">
          <span class="label">实付金额</span>
          <span class="value price">¥{{ order.actualPaymentAmount.toFixed(2) }}</span>
        </div>
      </div>

      <div class="info-card" v-if="order.paymentMethod || order.paymentTime">
        <div class="card-title">支付信息</div>
        <div class="info-row" v-if="order.paymentMethod">
          <span class="label">支付方式</span>
          <span class="value">{{ order.paymentMethod }}</span>
        </div>
        <div class="info-row" v-if="order.paymentTime">
          <span class="label">支付时间</span>
          <span class="value">{{ order.paymentTime }}</span>
        </div>
      </div>

      <div class="info-card" v-if="order.remark">
        <div class="card-title">备注</div>
        <div class="remark-content">{{ order.remark }}</div>
      </div>
    </div>

    <div class="loading-wrap" v-else>
      <van-loading size="24px">加载中...</van-loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOrderDetail, type ChargingOrder } from '@/api/user'
import { showFailToast } from 'vant'

const route = useRoute()
const router = useRouter()

const order = ref<ChargingOrder | null>(null)

const getStatusType = () => {
  const type = order.value?.chargingOrdersType
  if (type === 1) return 'primary'
  if (type === 2) return 'warning'
  return 'success'
}

const formatDuration = (hours: number | null) => {
  if (!hours || hours <= 0) return '-'
  const h = Math.floor(hours)
  const m = Math.floor((hours - h) * 60)
  if (h > 0) {
    return `${h}小时${m}分钟`
  }
  return `${m}分钟`
}

const goBack = () => {
  router.back()
}

const fetchDetail = async () => {
  const id = Number(route.params.id)
  try {
    const res = await getOrderDetail(id)
    order.value = res.data
  } catch (error: any) {
    console.error('获取订单详情失败:', error)
    showFailToast(error.response?.data?.msg || '获取订单详情失败')
  }
}

onMounted(() => {
  fetchDetail()
})
</script>

<style scoped>
.order-detail-page {
  height: 100%;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.detail-content {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}

.status-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-no {
  font-size: 14px;
  color: #666;
  word-break: break-all;
}

.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.info-row .label {
  color: #999;
  flex-shrink: 0;
}

.info-row .value {
  color: #333;
  text-align: right;
  max-width: 60%;
  word-break: break-all;
}

.info-row .value.highlight-num {
  color: #1989fa;
  font-weight: 600;
}

.info-row .value.price {
  color: #ee0a24;
  font-weight: 600;
}

.remark-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.loading-wrap {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
</style>

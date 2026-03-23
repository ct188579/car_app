import request from './request'

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  phone: string
  password: string
  captcha: string
}

export interface ChargingOrder {
  chargingOrdersId: number
  chargingOrdersNo: string
  chargingOrdersType: number
  chargingOrdersTypeLable: string
  chargingStationId: number
  chargingPileId: number
  beginTime: string | null
  endTime: string | null
  chargedQuantity: number | null
  chargingDuration: number | null
  estimatedRemainingDuration: number | null
  pendingPaymentAmount: number | null
  paidAmount: number | null
  carId: number
  totalOrderAmount: number | null
  electricityCost: number | null
  electricity: number | null
  serviceFee: number | null
  actualPaymentAmount: number | null
  paymentAmount: number | null
  paymentMethod: string | null
  paymentTime: string | null
  chargingStationName: string | null
  licenseTag: string | null
  carModels: string | null
  chargingPileName: string | null
  chargingPileNo: string | null
  remark: string | null
  createTime: string | null
  updateTime: string | null
}

export interface ChargingOrderResponse {
  data: ChargingOrder[]
  code: number
  msg: string
}

export const login = (data: LoginParams) => request.post('/login', data)

export const register = (data: RegisterParams) => request.post('/register', data)

export const getChargingOrders = () => 
  request.get<ChargingOrderResponse>('/bs-smart-charger/orders/list')

export const getOrderDetail = (id: number) => 
  request.get<ChargingOrder>(`/bs-smart-charger/orders/${id}`)

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'
import {
  Tabbar,
  TabbarItem,
  NavBar,
  CellGroup,
  Cell,
  Button,
  Tag,
  Empty,
  Loading,
  Field,
  PullRefresh
} from 'vant'

const app = createApp(App)

app.use(Tabbar)
app.use(TabbarItem)
app.use(NavBar)
app.use(CellGroup)
app.use(Cell)
app.use(Button)
app.use(Tag)
app.use(Empty)
app.use(Loading)
app.use(Field)
app.use(PullRefresh)

app.use(router)
app.mount('#app')
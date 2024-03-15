import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
// export * from './moundle/user'
// export * from './modules/counter'

import { useUserStore } from './modules/user'
export { useUserStore }
import { useCountStore } from './modules/counter'
export { useCountStore }
// import { BookStore } from './modules/book'
// export { BookStore }

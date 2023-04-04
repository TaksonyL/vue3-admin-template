import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// import user from './api/user'
import table from './api/table'
// import user from './api/user'

export const mockModules = [...table]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}

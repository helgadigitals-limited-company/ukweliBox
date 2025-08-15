import configureOpenAPI from '@/lib/configure-open-api.js'
import createApp from '@/lib/create-app.js'
import index from '@/routes/index.route.js'
// import tasks from "@/routes/tasks/tasks.index";

const app = createApp()

configureOpenAPI(app)

const routes = [
  index,
] as const

routes.forEach((route) => {
  app.route('/', route)
})

export type AppType = typeof routes[number]

export default app

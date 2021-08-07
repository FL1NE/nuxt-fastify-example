import fastify from 'fastify'

export default function (req: Request, res: Response) {
  const app = fastify({
    ignoreTrailingSlash: true,
    logger: false,
  })

  // 普通にサーバーを立てる場合はこんな感じ
  // app.ready()が呼ばれる前にこの辺の処理を定義しないといけない
  app.get('/', (_request, reply) => {
    reply.send({
      hello: 'world',
    })
  })

  app.ready().then(() => {
    app.server.emit('request', req, res)
  })
}

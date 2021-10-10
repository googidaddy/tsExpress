import  express from 'express'
import  path from 'path'
import http from 'http'
import  cookieParser from 'cookie-parser'
import  logger from 'morgan'
import  indexRouter from './routes/index'
import  usersRouter from './routes/users'
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const server = http.createServer(app)
const port =  process.env.PORT || '7000'

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'..', 'public')))
app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send({error:'404 not found'})
  next()
})

// error handler
app.use(function(err: { message: any ,status: any }, req: { app: { get: (arg0: string) => string } }, res: { locals: { message: any ,error: any } ,status: (arg0: any) => void ,render: (arg0: string) => void }, next: any) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

server.on('error', ()=>{console.log("error")})
server.on('listening', ()=>{console.log(`listen at http://localhost:${port}`)})
server.listen(port)
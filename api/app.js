const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./src/config/db')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors');

dotenv.config({ path: './src/config/config.env'})

connectDB()

const adminRoute = require('./src/routes/admin')
const authRoute = require('./src/routes/auth')
const stdRoute = require('./src/routes/std')
const ttrRoute = require('./src/routes/ttr')

const app = express()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res, next) => res.status(200).json({ message: "Server running"} ))

app.use('/api/v1/admin', adminRoute)
app.use('/api/v1/user', authRoute)
app.use('/api/v1/std', stdRoute)
app.use('/api/v1/ttr', ttrRoute)

app.listen(process.env.PORT, () =>
    console.log(`Server ready at http://localhost:${process.env.PORT}`)
)
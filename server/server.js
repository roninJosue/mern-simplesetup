import express from 'express'
import devBundle from './devBundle'
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()
const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernSimpleSetup'
let port = process.env.PORT || 3000

MongoClient.connect(url, (err, db)=>{
    console.log('Connected successfully to mongodb server')
    db.close()
})

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR)))
app.get('/', (req, res) => {
    res.status(200).send(template())
})

app.listen(port, function onStart(err){
    if(err){
        console.log(err)
    }
    console.info('Server started on port %s.', port)
})

devBundle.compile(app)

import express from "express"
import client from "prom-client"
import responseTime from "response-time"
import LokiTransport from "winston-loki"
import { doSomeHeavyTask } from "./util.js"
import { createLogger, transports } from "winston"

const app = express()

const collectMetrics = client.collectDefaultMetrics;
collectMetrics({register: client.register})

/*In this reqResTime I am creating custom metrics and using a middleware responseTime of each request
 */
const reqResTime = new client.Histogram({
    name: 'http_express_req_res_time', //name of our metrics that you can checkout in /metrics route
    help: 'This tells how much time is taken by a request and response', // giving a descripiton
    labelNames: ['method', 'route', 'status'], // these labels will help in grafana dashboard for filtering out
    buckets: [1, 5, 10, 50, 100, 150, 200, 400, 500, 800, 1000, 2000] // bucket for timestamps
})  

app.use(responseTime((req, res, time)=>{
    reqResTime.labels({
        method: req.method,
        route: req.url,
        status: req.status
    }).observe(time)    
}))


/*In this I am running loki server locally, Loki is used to collect the log from our running server */
const options = {
    transports:[
        new LokiTransport({
            host: "http://127.0.0.1:3100"
        })
    ]
}

const logger = createLogger(options)

app.get("/", (req, res)=>{
    return res.status(200).json({status: "success", message: "Hello from server"})
})

app.get("/slow", async (req, res)=>{
    try{
        logger.info("Req came on /slow route")
        const timeTaken = await doSomeHeavyTask();
        return res.status(200).json({
            status: "Success",
            message: `Time taken ${timeTaken}ms`
        })
    }catch(error){
        logger.error(error.message)
        res.status(500).json({message: "Internal server error"})
    }
})

app.get("/metrics", async (req, res)=>{
    res.setHeader("Content-Type", client.register.contentType)
    const metrics = await client.register.metrics();
    
    res.send(metrics);
})

app.listen(8000, ()=>{
    console.log("App running successfully")
})
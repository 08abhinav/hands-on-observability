import express from "express"
import client from "prom-client"
import { doSomeHeavyTask } from "./util.js"

const app = express()
const collectMetrics = client.collectDefaultMetrics;
collectMetrics({register: client.register})

app.get("/", (req, res)=>{
    return res.json({status: "success", message: "Hello from server"})
})

app.get("/slow", async (req, res)=>{
    try{
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "Success",
            message: `Time taken ${timeTaken}ms`
        })
    }catch(error){
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
# Hands-on Observability

This repository is part of my **learning phase on Observability**.  
The goal of this project is to get **practical, hands-on experience** with core observability tools like **Prometheus** and **Grafana**, and to understand how real systems are monitored in production.

---

## What is Observability?

**Observability** is the ability to understand the **internal state of a system by analyzing the data it produces**.

In simple terms:
> If your system is misbehaving, observability helps you answer **_why_**.

It focuses on signals like:
- Metrics
- Logs
- Traces

Using these signals, you can determine:
- Whether your infrastructure is healthy
- Where bottlenecks exist
- Why requests are slow or failing

Observability is critical for modern distributed systems where debugging by “just looking at the code” is impossible.

---

## What is Prometheus?

**Prometheus** is an open-source **metrics collection and monitoring system**.

### Why Prometheus is useful:
- It **scrapes metrics** from applications over HTTP
- Stores metrics as **time-series data**
- Allows querying data using **PromQL**
- Works extremely well for monitoring servers, APIs, containers, and microservices

In short:
> Prometheus answers **“What is happening in my system over time?”**

---

## What is Grafana?

**Grafana** is a **visualization and analytics dashboard** tool.

### Why Grafana is useful:
- Connects to Prometheus as a data source
- Converts raw metrics into:
  - Graphs
  - Dashboards
  - Alerts
- Makes system behavior **human-readable**

In short:
> Prometheus collects data, **Grafana makes sense of it**.

---

## About This Project

This project **mimics the behavior of a heavy / stressed server** to demonstrate how observability tools work in real scenarios.

Instead of using complex production systems, this project intentionally introduces:
- Slow responses
- Request delays
- Measurable metrics

So you can **observe how the system behaves under load** using Prometheus and Grafana.

---

## Application Routes

### `/` — Home Route
- Simple health route
- Confirms that the server is running
- Useful as a basic uptime check

---

### `/slow` — Slow Route
- Intentionally adds **artificial delay** to the request
- Simulates:
  - Heavy computation
  - Network latency
  - High server load
- Helps visualize:
  - Increased request duration
  - Performance degradation in Grafana dashboards

---

### `/metrics` — Metrics Route (Important)

This route exposes **application metrics in a format Prometheus understands**.

### Why `/metrics` exists:
- Prometheus works on a **pull-based model**
- It periodically **scrapes** this endpoint
- The application **does not push metrics**
- Prometheus **pulls metrics at fixed intervals**

Metrics exposed here typically include:
- Request count
- Request duration
- Error rates
- Custom application metrics

This endpoint is the **bridge between your application and Prometheus**.

---

## How Prometheus & Grafana Work Together Here

1. The application exposes metrics at `/metrics`
2. Prometheus scrapes this endpoint at regular intervals
3. Prometheus stores the data as time-series metrics
4. Grafana connects to Prometheus as a data source
5. Grafana visualizes:
   - Request latency
   - Traffic patterns
   - Performance trends
6. Slow requests from `/slow` are clearly visible in dashboards


## Note
Prometheus and Grafana are configured to run using **Docker Compose**.

For the complete setup, service configuration, ports, and networking details, please **refer to the `docker-compose.yml` file** in this repository.
---

## Tech Stack

- Backend Server (Node.js)
- Prometheus
- Grafana
- Docker / Docker Compose

---
## Setup Instructions

Follow the steps below to run the project and observability stack locally.

### 1. Clone the Repository
```bash
git clone https://github.com/08abhinav/hands-on-observability.git
cd hands-on-observability
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Update Prometheus Configuration
Open the prometheus-config.yml file and update your local machine IP in the targets section.

> targets: ["<YOUR_IP>:<APP_PORT>"]

### 4. Verify Docker Compose Configuration

Check the docker-compose.yml file to review:
- Prometheus service configuration
- Grafana service configuration
- Port mappings and volumes
- Make changes only if customization is required.

### 5. Run the application
```bash
npm run dev
```

### 6. Start Prometheus and Grafana
```bash
docker compose up
```

## Learning Outcome

By working on this project, I understand:
- What observability actually means in practice
- How Prometheus scrapes and stores metrics
- Why `/metrics` endpoints are critical
- How Grafana visualizes system behavior
- How slow systems look **from the outside**

## PS
- If you find this project helpful or interesting, **give it a ⭐** — it really helps!

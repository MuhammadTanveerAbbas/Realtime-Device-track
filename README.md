<p align="center">
  <img src="https://i.postimg.cc/J76vRdbv/Tracker.png" alt="Realtime Device Track" />
</p>

<h1 align="center">Realtime Device Track</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge" height="30" alt="Express" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge" height="30" alt="Node.js" />
  <img src="https://img.shields.io/badge/Socket.io-010101?logo=socketdotio&logoColor=white&style=for-the-badge" height="30" alt="Socket.io" />
</p>

## 🛰️ Overview

**Realtime Device Track** is an enterprise-grade backend solution for real-time GPS tracking and geolocation broadcasting. By leveraging **Node.js**, **Express**, and **Socket.io**, this application delivers ultra-low-latency WebSocket streams for location updates. It is designed for high scalability, maintainability, and seamless integration with mapping libraries such as **Leaflet.js**.

---

## 📌 Core Features

- 🔄 **Live GPS Data Streaming** via Socket.io  
- 🗺️ **Interactive Mapping Support** (Leaflet.js-compatible)  
- 🧭 **RESTful APIs** for device registration and tracking  
- ⚡ **High-Performance, Scalable Architecture**  
- 🧩 **Modular Codebase** for enterprise-grade extensions  

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/MuhammadTanveerAbbas/Realtime-Device-track.git
cd Realtime-Device-track

# 2. Install dependencies
npm install

# 3. Launch the application
npx nodemon
````

> **Frontend Integration Tip:**
> Use a Socket.io client to listen for `locationUpdate` events and render real-time coordinates on a Leaflet map.

---

## 📡 API Endpoints

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/api/device/register` | Register a new tracking device    |
| POST   | `/api/device/track`    | Submit real-time location updates |
| GET    | `/api/device/:id`      | Retrieve the last known location  |


## 📝 License

This project is licensed under the **MIT License**.

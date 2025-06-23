# BMW_aptitude

## This is the BMW Aptititude test repo

# BMW Aptitude Test Fullstack Project

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed

## Project Structure
```
BMW_aptitude/
  Backend/         # Node.js + Express + TypeScript API
  Frontend/        # React + Vite frontend
  mongo-init/      # MongoDB seed script
  docker-compose.yml
```

## Quick Start

1. **Clone the repository**

2. **Set up environment variables**
   - Edit `Backend/.env` if needed. Example:
     ```
     MONGODB_URI=mongodb://mongo:27017/bmw-aptitude
     PORT=3000
     ```

3. **(Optional) Edit MongoDB seed data**
   - See `mongo-init/mongo-init.js` to add or change initial car data.

4. **Build and run all services**
   ```sh
   docker-compose up --build
   ```
   - This will start:
     - MongoDB (with seed data if first run)
     - Backend API (http://localhost:3000)
     - Frontend (http://localhost:5173)

5. **Access the app**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:3000](http://localhost:3000)


## Notes
- The backend connects to MongoDB using the service name `mongo` as the hostname.
- The MongoDB seed script only runs if the database is empty (first run).

---

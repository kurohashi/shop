# MyShop
Its a backend service for FMCG shop

### Database (myshop) schema
1. Product:
    ``` { sku (unique), name, category, count, color, price, etc} ```
2. Customer:
    ``` { id (unique), phone (unique), name, sex, address, etc } ```
3. Purchases:
    ``` { customerId (customer id), sku (product id), agentId (agent who did the purchase), ts (ms timestamp of purchase) } ```

### Pre-requisites
1. node 16
2. mongodb

### Setup
1. Run ``` npm install ```.
2. Start the service using ``` node server.js ```.
3. The server will run on port ``` 10001 ```.
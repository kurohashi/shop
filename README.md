# MyShop
Its a backend service for FMCG shop

### Database schema
1. Product:
    ``` { sku (unique), name, category, count, color, price, etc} ```
2. Customer:
    ``` { id (unique), phone (unique), name, sex, address, etc } ```
3. Purchases:
    ``` { id (user id), sku (product id), ts (ms timestamp of purchase) } ```
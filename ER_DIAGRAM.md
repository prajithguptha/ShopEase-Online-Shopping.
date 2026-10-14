# ER Diagram — Online Shopping System

Paste this Mermaid source into https://mermaid.live to render or export the ER diagram.

```mermaid
erDiagram
    CATEGORIES ||--o{ PRODUCTS : contains
    CUSTOMERS ||--o{ ORDERS : places
    ORDERS ||--|{ ORDER_ITEMS : includes
    PRODUCTS ||--o{ ORDER_ITEMS : appears_in

    CATEGORIES {
        NUMBER category_id PK
        VARCHAR2 category_name
    }
    PRODUCTS {
        NUMBER product_id PK
        NUMBER category_id FK
        VARCHAR2 product_name
        NUMBER price
        NUMBER stock_qty
    }
    CUSTOMERS {
        NUMBER customer_id PK
        VARCHAR2 full_name
        VARCHAR2 email UK
        VARCHAR2 phone
    }
    ORDERS {
        NUMBER order_id PK
        NUMBER customer_id FK
        DATE order_date
        VARCHAR2 status
    }
    ORDER_ITEMS {
        NUMBER order_item_id PK
        NUMBER order_id FK
        NUMBER product_id FK
        NUMBER quantity
        NUMBER unit_price
    }
```

## Relationships
- One category can contain many products.
- One customer can place many orders.
- One order contains one or more order items.
- One product can appear in many order items.

# Online Shopping System (Beginner Mini-Project)

## Included
- `web/index.html` — product listing, search/category filter, cart, checkout and order history.
- `web/style.css` — responsive styling.
- `web/app.js` — sample products and browser-local cart/order logic.
- `database/online_shopping_oracle.sql` — Oracle SQL tables, constraints, sample data, view, sequence, and example queries.
- `docs/ER_DIAGRAM.md` — Mermaid ER diagram source.
- `docs/PROJECT_REPORT.docx` — college-style project report.

## Run the website
1. Extract the ZIP file.
2. Open `web/index.html` in Chrome, Edge, or Firefox.
3. Search products, add items to cart, and use Checkout to create a demo order.
4. Cart and demo orders are stored in the browser's `localStorage`.

No installation is required for the browser demo.

## Run the Oracle SQL script
1. Install Oracle Database and open SQL*Plus or Oracle SQL Developer.
2. Connect with a user allowed to create tables and sequences (or ask your lab administrator).
3. Open `database/online_shopping_oracle.sql`.
4. Run the script as a script (in SQL Developer, press F5).
5. Review the output and try the example SELECT queries at the end.

## Important scope note
The website is a beginner-friendly frontend demonstration and stores demo cart/orders in the browser. The Oracle SQL file defines the database structure and sample records, but the browser does **not** connect directly to Oracle. A real multi-user deployment needs a server-side backend (for example, Java Spring Boot/JDBC) to authenticate users, validate prices, create orders in Oracle, and process payments securely. This project does not collect real payment details.

import { CategorieGrid, ProductsGrid, MailGrid, UserGrid, OrderGrid, MainGrid } from './views'

const dashboardRoutes = [
    {
        path: "main",
        layout: "/",
        namme: "Main",
        component: MainGrid
    },
    {
        path: "categorie",
        layout: "/",
        name: "Categorie",
        component: CategorieGrid
    },
    { 
        path: "mail", 
        layout: "/",
        name: "Mail",
        component: MailGrid
    },
    {
        path: "users",
        layout: "/",
        name: "Users",
        component: UserGrid
    },
    {
        path: "products",
        layout: "/",
        name: "Products",
        component: ProductsGrid
    },
    {
        path: "orders",
        layout: "/",
        name: "Orders",
        component: OrderGrid
    }
  ];
  
  export default dashboardRoutes;
  
import { CategorieGrid, ProductsGrid, MailGrid, UserGrid } from './views'

const dashboardRoutes = [
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
    }
  ];
  
  export default dashboardRoutes;
  
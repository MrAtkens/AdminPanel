import { MainPage, ProductsTable, OrdersTable, MailsTable, CategoriesTable, UsersTable, ProductEditPage, ProductAddPage} from './containers'

const dashboardRoutes = [
    {
        path: "main",
        layout: "/",
        namme: "Main",
        component: MainPage
    },
    {
        path: "categorie",
        layout: "/",
        name: "Categorie",
        component: CategoriesTable
    },
    { 
        path: "mail", 
        layout: "/",
        name: "Mail",
        component: MailsTable
    },
    {
        path: "users",
        layout: "/",
        name: "Users",
        component: UsersTable
    },
    {
        path: "products",
        layout: "/",
        name: "Products",
        component: ProductsTable
    },
    {
        path: "orders",
        layout: "/",
        name: "Orders",
        component: OrdersTable
    },
    {
        path: "productEdit/:id",
        layout: "/",
        name: "ProductEditPage",
        component: ProductEditPage
    },
    {
        path: "productAdd",
        layout: "/",
        name: "ProductAddPage",
        component: ProductAddPage
    }
  ];
  
  export default dashboardRoutes;
  
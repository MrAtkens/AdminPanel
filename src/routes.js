import { MainPage, OrdersTable, MailsTable, CategoriesTable, UsersTable,
ProductsTable, ProductEditPage, ProductAddPage,
NewsTable, NewsEditPage, NewsAddPage} from './containers'

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
        path: "orders",
        layout: "/",
        name: "Orders",
        component: OrdersTable
    },
    {
        path: "products",
        layout: "/",
        name: "Products",
        component: ProductsTable
    },
    {
        path: "productAdd",
        layout: "/",
        name: "ProductAddPage",
        component: ProductAddPage
    },
    {
        path: "productEdit/:id",
        layout: "/",
        name: "ProductEditPage",
        component: ProductEditPage
    },
    {
        path: "news",
        layout: "/",
        name: "NewsTable",
        component: NewsTable
    },
    {
        path: "newsAdd",
        layout: "/",
        name: "NewsAdd",
        component: NewsAddPage
    },
    {
        path: "newsEdit/:id",
        layout: "/",
        name: "NewsEditPage",
        component: NewsEditPage
    }
  ];
  
  export default dashboardRoutes;
  
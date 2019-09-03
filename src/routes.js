import { MainGrid, CategorieGrid, MailGrid, UserGrid } from './views'

const dashboardRoutes = [
    {
        path: "main",
        layout: "/",
        name: "MainPage",
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
    }
  ];
  
  export default dashboardRoutes;
  
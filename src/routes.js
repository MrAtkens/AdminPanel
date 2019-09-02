import { MainGrid, CategorieGrid } from './views'

const dashboardRoutes = [
    {
        path: "main",
        layout: "/",
        name: "MainPage",
        component: MainGrid,
    },
    {
        path: "categorie",
        layout: "/",
        name: "Categorie",
        component: CategorieGrid,
    }
  ];
  
  export default dashboardRoutes;
  
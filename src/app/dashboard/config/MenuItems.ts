import { MenuItem } from "primeng/api";

export const MENU_ITEMS: MenuItem[] = [
  {
    title: 'Plantaciones',
    route: '/dashboard/plantation',
    icon: 'pi pi-sun',
    role: ['EMPLOYEE','BOSS']
  },
  {
    title: 'Cultivos',
    route: '/dashboard/crops',
    icon: 'pi pi-warehouse',
    role: ['EMPLOYEE','BOSS']
  },
  {
    title: 'Facturación',
    route: '/facturation',
    icon: 'pi pi-chart-bar',
    role: ['BOSS']
  },
  {
    title: 'Pedidos',
    route: '/orders',
    icon: 'pi pi-shopping-cart',
    role: ['EMPLOYEE','BOSS']
  },
  {
    title: 'Ajustes',
    route: '/settings',
    icon: 'pi pi-wrench',
    role: ['EMPLOYEE','BOSS']
  }
];

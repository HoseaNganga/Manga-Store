import { MenuItem } from 'primeng/api';

export const navbarItems: MenuItem[] = [
  {
    label: 'Home',
    icon: 'pi pi-home',
  },
  {
    label: 'Categories',
    icon: 'pi pi-th-large',
    badge: '9',
    items: [
      {
        label: 'Action',
        icon: 'pi pi-bolt',
      },
      {
        separator: true,
      },
      {
        label: 'Supernatural',
        icon: 'pi pi-moon',
      },
      {
        separator: true,
      },
      {
        label: 'Fantasy',
        icon: 'pi pi-star',
      },
      {
        separator: true,
      },
      {
        label: 'Shonen',
        icon: 'pi pi-users',
      },
      {
        separator: true,
      },
      {
        label: 'Seinen',
        icon: 'pi pi-user',
      },
      {
        separator: true,
      },
      {
        label: 'SuperPower',
        icon: 'pi pi-shield',
      },
      {
        separator: true,
      },
      {
        separator: true,
      },
      {
        label: 'Adventure',
        icon: 'pi pi-compass',
      },
      {
        separator: true,
      },
      {
        label: 'Soccer',
        icon: 'pi pi-sun',
      },
      {
        separator: true,
      },
      {
        label: 'Sci-fi',
        icon: 'pi pi-cog',
      },
    ],
  },
];

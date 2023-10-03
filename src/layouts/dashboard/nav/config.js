// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'clients',
    path: '/dashboard/clients',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'Logout',
  //   path: '/dashboard/logout',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

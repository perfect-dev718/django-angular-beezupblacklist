import {
  faPhoneSquare,
  faDollarSign,
  faTimes,
  faShoppingCart,
  faCalculator,
  faMailBulk,
  faStoreAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

export const MENU = [
  {
    name: 'Blacklister',
    url: 'blacklist',
    icon: faTimes,
    tooltip: ""
  },
  {
    name: 'Repricer',
    url: 'repricer',
    icon: faDollarSign,
    tooltip: ''
  },
  {
    name: 'Achat Automatique',
    url: 'achat-automatique',
    icon: faShoppingCart,
    tooltip: ""
  },
  {
    name: 'Comptabilite',
    url: 'comptabilite',
    icon: faCalculator,
    tooltip: ""
  },
  {
    name: 'Gestion des Suivis',
    url: 'gestion-de-suivis',
    icon: faMailBulk,
    tooltip: ""
  },
  {
    name: 'Centre de Controle',
    url: 'control-center',
    icon: faPhoneSquare,
    tooltip: ""
  },
  {
    name: 'Catalog Marketplaces',
    url: 'catalog-marketplaces',
    icon: faStoreAlt,
    tooltip: ""
  },
  {
    name: 'Logout',
    action: 'logout',
    icon: faSignOutAlt,
    tooltip: ""
  }
];

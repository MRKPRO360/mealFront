import { Settings2, SquareTerminal } from 'lucide-react';

const getNavItemsByRole = (role: string) => {
  switch (role) {
    case 'customer':
      return [
        {
          title: 'Weekly Plan',
          url: 'customer/meal-plan',
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: 'My Meal Plan',
              url: '/customer/meal-plan',
              icon: SquareTerminal,
            },
            {
              title: 'Create My Plan',
              url: '/customer/create-meal-plan',
              icon: SquareTerminal,
            },
            {
              title: 'Customize My Plan',
              url: '/customer/customize-meal-plan',
              icon: SquareTerminal,
            },
          ],
        },

        {
          title: 'Orders',
          url: '/customer/my-orders',
          icon: SquareTerminal,
          items: [
            {
              title: 'My Orders',
              url: '/customer/my-orders',
            },
          ],
        },

        {
          title: 'Providers',
          icon: SquareTerminal,
          url: '/all-providers',
          items: [
            {
              title: 'All Providers',
              url: '/all-providers',
            },
          ],
        },
        {
          title: 'My Cart',
          url: '/cart',
          icon: SquareTerminal,
          items: [
            {
              title: 'Cart',
              url: '/cart',
            },
          ],
        },
        {
          title: 'Settings',
          url: '/profile',
          icon: Settings2,
          items: [
            { title: 'View Profile', url: '/profile' },
            { title: 'Update Profile', url: '/update-profile' },
            { title: 'Change Password', url: '/change-password' },
          ],
        },
      ];

    case 'provider':
      // return [
      //   {
      //     title: 'Dashboard',
      //     url: '/provider/dashboard',
      //     icon: SquareTerminal,
      //     isActive: true,
      //   },
      //   {
      //     title: 'Manage Meal Plans',
      //     url: '/provider/manage-meal-plans',
      //     icon: SquareTerminal,
      //   },
      //   {
      //     title: 'Orders',
      //     url: '/provider/orders',
      //     icon: SquareTerminal,
      //   },
      //   {
      //     title: 'My Profile',
      //     url: '/profile',
      //     icon: Settings2,
      //     items: [
      //       { title: 'View Profile', url: '/profile' },
      //       { title: 'Update Profile', url: '/update-profile' },
      //       { title: 'Change Password', url: '/change-password' },
      //     ],
      //   },
      // ];

      return [
        {
          title: 'Menu',
          url: '/provider/my-meal',
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: 'My Meal',
              url: '/provider/my-meal',
              icon: SquareTerminal,
            },
            {
              title: 'Create Meal',
              url: '/provider/create-meal',
              icon: SquareTerminal,
            },
          ],
        },

        {
          title: 'Orders',
          url: '/provider/customer-orders',
          icon: SquareTerminal,
          items: [
            {
              title: 'Customer Orders',
              url: '/provider/customer-orders',
            },
          ],
        },
        {
          title: 'Settings',
          url: '/profile',
          icon: Settings2,
          items: [
            { title: 'View Profile', url: '/profile' },
            { title: 'Update Profile', url: '/update-profile' },
            { title: 'Change Password', url: '/change-password' },
          ],
        },
      ];

    case 'admin':
      return [
        {
          title: 'Manage Users',
          url: '/admin/manage-users',
          icon: SquareTerminal,
        },
        {
          title: 'Manage Orders',
          url: '/admin/manage-orders',
          icon: SquareTerminal,
        },
        {
          title: 'Weekly Plan',
          url: '/admin/meal-plan',
          icon: SquareTerminal,
          items: [
            {
              title: 'Meal Plan',
              url: '/admin/meal-plan',
              icon: SquareTerminal,
            },
            {
              title: 'Create My Plan',
              url: '/admin/create-meal-plan',
              icon: SquareTerminal,
            },
            {
              title: 'Customize My Plan',
              url: '/admin/customize-meal-plan',
              icon: SquareTerminal,
            },
          ],
        },
        {
          title: 'Providers',
          icon: SquareTerminal,
          url: '/all-providers',
          items: [
            {
              title: 'All Providers',
              url: '/all-providers',
            },
          ],
        },
        {
          title: 'Settings',
          url: '/profile',
          icon: Settings2,
          items: [
            { title: 'View Profile', url: '/profile' },
            { title: 'Update Profile', url: '/update-profile' },
            { title: 'Change Password', url: '/change-password' },
          ],
        },
      ];

    default:
      return [];
  }
};

export default getNavItemsByRole;

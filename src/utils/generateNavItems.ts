import { Settings2, SquareTerminal } from 'lucide-react';

const getNavItemsByRole = (role: string) => {
  switch (role) {
    case 'customer':
      return [
        {
          title: 'Menu',
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
            { title: 'My Orders', url: '/customer/my-orders' },
            { title: 'All Providers', url: '/customer/all-providers' },
          ],
        },
        {
          title: 'My Profile',
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

            { title: 'Customer Orders', url: '/provider/customer-orders' },
          ],
        },
        {
          title: 'My Profile',
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
          title: 'Admin Dashboard',
          url: '/admin/dashboard',
          icon: SquareTerminal,
          isActive: true,
        },
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
          title: 'Settings',
          url: '/admin/settings',
          icon: Settings2,
        },
      ];

    default:
      return [];
  }
};

export default getNavItemsByRole;

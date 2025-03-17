'use client';
import logo from '@/assets/images/logo/feastify.png';

import { Settings2, SquareTerminal } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { TeamSwitcher } from './team-switcher';
import { NavMain } from './nav-main';

import { NavUser } from './nav-user';
import { useUser } from '@/context/UserContext';

// This is sample data.
const data = {
  teams: [
    {
      name: 'Feastify',
      logo: logo,
      plan: 'Your Meal',
    },
  ],
  navMain: [
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
        {
          title: 'My Orders',
          url: '/customer/my-orders',
        },
      ],
    },
    {
      title: 'My Profile',
      url: '/profile',
      icon: Settings2,
      items: [
        {
          title: 'View Profile',
          url: '/profile',
        },
        {
          title: 'Update Profile',
          url: '/update-profile',
        },
        {
          title: 'Change Password',
          url: '/change-password',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // DYNAMIC SIDEBAR BASED ON USER ROLE
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

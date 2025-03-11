'use client';
import logo from '@/assets/images/logo/feastify.png';

import {
  AudioWaveform,
  Command,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

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

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
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
          title: 'Meal Plan',
          url: '/customer/meal-plan',
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
          title: 'Update Profile',
          url: '/profile',
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

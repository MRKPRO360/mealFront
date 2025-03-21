'use client';
import logo from '@/assets/images/logo/feastify.png';

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
import getNavItemsByRole from '@/utils/generateNavItems';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const role = user?.role || 'guest'; // Default role if user is not logged in

  // DYNAMIC SIDEBAR BASED ON USER ROLE

  // This is sample data.
  const data = {
    teams: [
      {
        name: 'Feastify',
        logo: logo,
        plan: 'Your Meal',
      },
    ],
    navMain: getNavItemsByRole(role),
  };

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

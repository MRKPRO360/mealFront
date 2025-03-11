import { ChevronsUpDown } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image, { StaticImageData } from 'next/image';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: StaticImageData | React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center ">
            <Image
              width={40}
              height={40}
              src={teams[0].logo}
              alt="feastify logo"
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{teams[0].name}</span>
            <span className="truncate text-xs">{teams[0].plan}</span>
          </div>

          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

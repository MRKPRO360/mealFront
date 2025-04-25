import { ChevronsUpDown } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: StaticImageData | React.ElementType | string;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href="/">
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          >
            <div className="flex aspect-square size-8 items-center justify-center">
              {typeof teams[0].logo === 'string' || 'src' in teams[0].logo ? (
                <Image
                  width={40}
                  height={40}
                  src={teams[0].logo}
                  alt={`${teams[0].name} logo`}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center">
                  {React.createElement(teams[0].logo)}
                </div>
              )}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{teams[0].name}</span>
              <span className="truncate text-xs">{teams[0].plan}</span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

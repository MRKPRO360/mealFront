import Link from 'next/link';
import MenuItem from '../../menu/MenuItem/MenuItem';
import { Button } from '@/components/ui/button';
import { getAllMenuNames } from '@/services/MenuNameService';

async function HomeMenuItem() {
  const menuNames = await getAllMenuNames();

  return (
    <div>
      <MenuItem menuNames={menuNames?.data} />
      <div className="text-center mt-12">
        <Link href="/menu">
          <Button>View Our Menus </Button>
        </Link>
      </div>
    </div>
  );
}

export default HomeMenuItem;

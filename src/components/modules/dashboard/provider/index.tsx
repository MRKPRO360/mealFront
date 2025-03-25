'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FTModal } from '@/components/ui/core/FTModal';
import { FTTable } from '@/components/ui/core/FTTable';
import TablePagination from '@/components/ui/core/FTTable/TablePagination';
import { deleteMyRecipe, revalidateRecipes } from '@/services/RecipeService';
import { IMeta, IRecipe } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eye, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

function MyMeal({ recipes, meta }: { recipes: IRecipe[]; meta: IMeta }) {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<string[] | []>([]);

  const handleView = (recipe: IRecipe) => {
    console.log('Viewing product:', recipe);
    router.push(`/recipe/${recipe._id}`);
  };

  const handleDelete = async (recipeId: string) => {
    console.log('Deleting recipe with ID:', recipeId);
    try {
      const res = await deleteMyRecipe(recipeId);

      if (res.success) {
        await revalidateRecipes();
        toast.success('Recipe is deleted!');
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to delete recipe plan :(');
    }
  };

  const columns: ColumnDef<IRecipe>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            if (value) {
              setSelectedIds((prev) => [...prev, row.original._id]);
            } else {
              setSelectedIds(
                selectedIds.filter((id) => id !== row.original._id)
              );
            }
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'name',
      header: 'Recipe Name',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original?.recipeImage}
            alt={row.original?.recipeName}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original?.recipeName}</span>
        </div>
      ),
    },
    {
      accessorKey: 'Menu Name',
      header: 'Menu Name',
      cell: ({ row }) => <span>{row.original.recipeMenuName.name}</span>,
    },
    {
      accessorKey: 'Quantity',
      header: 'Quantity',
      cell: ({ row }) => <span>{row.original.quantity}</span>,
    },
    {
      accessorKey: 'Ratings',
      header: 'Ratings',
      cell: ({ row }) => <span>{row.original.rating}</span>,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => (
        <span
          className={`${
            row.original.inStock
              ? 'bg-green-700 text-white p-1 rounded-xs'
              : 'bg-red-700 text-white p-1 rounded-xs'
          }`}
        >
          {row.original.inStock ? 'True' : 'False'}
        </span>
      ),
    },
    //    {
    //      accessorKey: 'price',
    //      header: 'Price',
    //      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    //    },

    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <button
            className="text-gray-500 hover:text-blue-500 cursor-pointer"
            title="View"
            onClick={() => handleView(row.original)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-gray-500 hover:text-green-500 cursor-pointer"
            title="Edit"
            onClick={() =>
              router.push(`/provider/update-meal/${row.original._id}`)
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <FTModal
            title={`Are you sure to delete ${row.original.recipeName}`}
            onConfirm={() => handleDelete(row.original._id)}
          >
            <button
              className="text-gray-500 hover:text-red-500 cursor-pointer"
              title="Delete"
            >
              <Trash className="w-5 h-5" />
            </button>
          </FTModal>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">My Recipes</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/provider/create-meal')}
            size="sm"
          >
            Create Meal <Plus />
          </Button>
        </div>
      </div>
      <FTTable columns={columns} data={recipes || []} />
      <TablePagination totalPage={meta?.totalPage} />
    </div>
  );
}

export default MyMeal;

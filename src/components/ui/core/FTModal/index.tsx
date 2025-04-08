'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FTModalProps {
  title: string;
  description?: string;
  onConfirm: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
}

export const FTModal = ({
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}: FTModalProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {description && <p className="text-gray-600">{description}</p>}
          <DialogFooter>
            <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
              {cancelText}
            </Button>
            <Button size="sm" variant="destructive" onClick={handleConfirm}>
              {confirmText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

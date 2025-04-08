// 'use client';

// import { useState } from 'react';
// import { Button } from '../../button';
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '../../dialog';

// interface FTContentModalProps {
//   title: string;
//   description?: string;
//   onConfirm?: (close: () => void) => Promise<void>;
//   confirmText?: string;
//   cancelText?: string;
//   children: (close: () => void) => React.ReactNode;
//   icon?: React.ReactNode;
//   btnSize?: 'default' | 'sm' | 'lg' | 'icon';
//   btnText?: string;
//   btnVariant?: 'ghost' | 'outline' | 'secondary' | 'link' | 'destructive';
//   btnColor?: string;
//   hideFooter?: boolean;
// }

// export const FTContentModal = ({
//   title,
//   description,
//   onConfirm,
//   confirmText = 'Confirm',
//   cancelText = 'Cancel',
//   children,
//   icon = 'Open Modal',
//   btnSize = 'sm',
//   btnText,
//   btnVariant = 'secondary',
//   btnColor = 'black',
//   hideFooter,
// }: FTContentModalProps) => {
//   const [open, setOpen] = useState(false);

//   const handleConfirm = () => {
//     onConfirm?.(() => setOpen(false));
//   };

//   return (
//     <>
//       {/* You can customize this trigger separately if needed */}
//       <Button
//         className={`rounded-xs text-${btnColor} hover:text-${btnColor}   ${
//           btnColor !== 'black' &&
//           btnVariant !== 'ghost' &&
//           `hover:bg-${btnColor} hover:text-white`
//         } `}
//         variant={btnVariant}
//         size={btnSize}
//         onClick={() => setOpen(true)}
//       >
//         {icon} {btnText}
//       </Button>

//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>{title}</DialogTitle>
//           </DialogHeader>

//           {description && <p className="text-gray-600">{description}</p>}

//           {/* Here's where your JSX gets rendered */}
//           <div onClick={() => setOpen(true)} className="py-4">
//             {children(() => setOpen(false))}
//           </div>

//           {!hideFooter && (
//             <DialogFooter>
//               <Button
//                 size="sm"
//                 variant="outline"
//                 onClick={() => setOpen(false)}
//               >
//                 {cancelText}
//               </Button>
//               {onConfirm && (
//                 <Button size="sm" variant="destructive" onClick={handleConfirm}>
//                   {confirmText}
//                 </Button>
//               )}
//             </DialogFooter>
//           )}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

'use client';

import { useState } from 'react';
import { Button } from '../../button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../dialog';

interface FTContentModalProps {
  title: string;
  description?: string;
  onConfirm?: (close: () => void) => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  children: (close: () => void) => React.ReactNode;
  icon?: React.ReactNode;
  btnSize?: 'default' | 'sm' | 'lg' | 'icon';
  btnText?: string;
  btnVariant?: 'ghost' | 'outline' | 'secondary' | 'link' | 'destructive';
  btnColor?: string;
  hideFooter?: boolean;
}

export const FTContentModal = ({
  title,
  description,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
  icon = 'Open Modal',
  btnSize = 'sm',
  btnText,
  btnVariant = 'secondary',
  btnColor = 'black',
  hideFooter = false,
}: FTContentModalProps) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <Button
        className={`rounded-xs text-${btnColor} hover:text-${btnColor} ${
          btnColor !== 'black' &&
          btnVariant !== 'ghost' &&
          `hover:bg-${btnColor} hover:text-white`
        }`}
        variant={btnVariant}
        size={btnSize}
        onClick={() => setOpen(true)}
      >
        {icon} {btnText}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>

          {description && <p className="text-gray-600">{description}</p>}

          <div className="pt-1 pb-4">{children(close)}</div>

          {!hideFooter && (
            <DialogFooter>
              <Button size="sm" variant="outline" onClick={close}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onConfirm(close)}
                >
                  {confirmText}
                </Button>
              )}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

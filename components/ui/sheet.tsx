'use client';
import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;

const SheetContent = React.forwardRef(({ className, ...props }: any, ref: any) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn("fixed right-0 top-0 z-50 h-full w-[300px] bg-white p-4 shadow-lg", className)}
      {...props}
    />
  </SheetPrimitive.Portal>
));
SheetContent.displayName = 'SheetContent';

export {
  Sheet,
  SheetTrigger,
  SheetContent
};

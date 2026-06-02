'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Modal acessível com focus trap, ESC para fechar e aria-modal.
 * Em mobile (<768px) apresenta como bottom sheet.
 */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `modal-title-${title.toLowerCase().replace(/\s+/g, '-')}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  // Fecha ao clicar no backdrop (fora do conteúdo)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onClick={handleBackdropClick}
      className={cn(
        // Reset padrão do dialog
        'p-0 bg-transparent border-none outline-none',
        // Backdrop
        'backdrop:bg-black/60 backdrop:backdrop-blur-sm',
        // Desktop: centralizado
        'md:rounded-xl md:max-w-lg md:w-full md:mx-auto md:my-auto',
        // Mobile: bottom sheet
        'max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:rounded-t-2xl max-md:w-full max-md:m-0',
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'bg-bg-surface border border-border-subtle',
          'md:rounded-xl',
          'max-md:rounded-t-2xl',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2
            id={titleId}
            className="text-base font-semibold text-text-primary"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            className="rounded p-1 text-text-secondary hover:text-text-primary hover:bg-bg-raised transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">{children}</div>
      </div>
    </dialog>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarUploadProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  defaultPreview?: string | null;
  size?: 'sm' | 'md' | 'lg';
  accept?: string;
  className?: string;
}

export function AvatarUpload<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  defaultPreview = null,
  size = 'md',
  accept = 'image/*',
  className,
}: AvatarUploadProps<TFieldValues>) {
  const [preview, setPreview] = useState<string | null>(defaultPreview);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          className={cn('flex flex-col gap-4', className)}
          data-invalid={fieldState.invalid}
        >
          {label && (
            <FieldLabel
              htmlFor={field.name}
              className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
            >
              {label}
            </FieldLabel>
          )}

          <Avatar className="size-20 md:size-20 rounded-lg mx-0">
            <AvatarImage
              className=""
              src={preview ?? undefined}
              alt="Profile"
            />
            <AvatarFallback>
              <User className="h-1/2 w-1/2 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <input
            type="file"
            accept={accept}
            className="hidden"
            id={field.name}
            name={field.name}
            onBlur={field.onBlur}
            aria-invalid={fieldState.invalid}
            ref={(el) => {
              field.ref(el);
              inputRef.current = el;
            }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
              setPreview(URL.createObjectURL(file));
              field.onChange(file);
            }}
          />

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="link"
              onClick={() => inputRef.current?.click()}
              className="font-semibold pl-0 text-[#8069BF] cursor-pointer"
            >
              {preview ? 'Change photo' : 'Upload photo'}
            </Button>

            {preview && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
                  setPreview(null);
                  field.onChange(undefined);
                  if (inputRef.current) inputRef.current.value = '';
                }}
                className="cursor-pointer"
              >
                Remove
              </Button>
            )}
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

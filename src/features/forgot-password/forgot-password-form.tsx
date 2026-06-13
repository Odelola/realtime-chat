import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Field,
  FieldLabel,
  FieldError,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  FieldGroup,
} from '@/components';
import { forgotPasswordSchema } from './validation/forgot-password-schema';
import useAuthStore from '@/store/auth-store';
import { type ForgotPasswordBody } from './types/auth';
import { useForgotPasswordMutation } from './hooks/use-forgot-password-mutation';
import { MailIcon } from 'lucide-react';

import * as yup from 'yup';

export const ForgotPasswordForm = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const form = useForm<yup.InferType<typeof forgotPasswordSchema>>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useForgotPasswordMutation({
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof forgotPasswordSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-4 mb-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    Email address
                  </FieldLabel>
                  <InputGroup className="bg-black rounded-lg px-3 py-4 border-[#ABAAAE]">
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="name@company.com"
                      className="text-[#ABAAAE]"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-start">
                      <MailIcon className="text-[#ABAAAE]" />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Field>
            <Button
              type="submit"
              className="mb-6 cursor-pointer rounded-full py-5 bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
            >
              Send Reset Link
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

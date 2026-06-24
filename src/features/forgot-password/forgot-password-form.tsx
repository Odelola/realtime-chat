import { Link } from 'react-router-dom';
import { type AxiosError } from 'axios';

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
  FieldDescription,
} from '@/components';
import { forgotPasswordSchema } from './validation/forgot-password-schema';
import { useForgotPasswordMutation } from './hooks/use-forgot-password-mutation';
import { MailIcon } from 'lucide-react';

import * as yup from 'yup';

export const ForgotPasswordForm = () => {
  const form = useForm<yup.InferType<typeof forgotPasswordSchema>>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useForgotPasswordMutation({
    onSuccess: () => {
      toast.success('Password reset link sent. Check your email.', {
        theme: 'colored',
      });
      form.reset();
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message = axiosErr.response?.data?.message ?? err.message;
      toast.error(message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof forgotPasswordSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-full h-full max-w-md px-8 py-12 rounded-xl bg-black/30 backdrop-blur-sm">
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup className="space-y-0">
          <div className="space-y-5 mb-7">
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
                  <InputGroup className="bg-transparent rounded-lg px-2 py-5 border border-[#333333]">
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      placeholder="name@company.com"
                      className="text-[#a0a0a0] placeholder-[#707070] text-sm leading-relaxed"
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
          <Field className="mb-6">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer rounded-full p-8  w-full bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] text-base font-medium shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
            >
              {mutation.isPending ? 'Sending…' : 'Send Reset Link'}
            </Button>
            <FieldDescription className="text-center">
              <Link to="/login" className="no-underline">
                <span className="text-[#ABAAAE] text-sm underline-offset-4 tracking-[1px] hover:underline hover:text-[#9FA7FF]">
                  Back to login
                </span>
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

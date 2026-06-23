import { Link, useNavigate, useSearchParams } from 'react-router-dom';
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
import { resetPasswordSchema } from './validation/reset-password-schema';
import { useResetPasswordMutation } from './hooks/use-reset-password-mutation';
import { EyeIcon, EyeOffIcon, LockIcon, ShieldCheckIcon } from 'lucide-react';
import { useState } from 'react';

import * as yup from 'yup';

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<yup.InferType<typeof resetPasswordSchema>>({
    resolver: yupResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutation = useResetPasswordMutation({
    onSuccess: () => {
      toast.success('Password reset successfully. Please log in.', {
        theme: 'colored',
      });
      navigate('/login');
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message = axiosErr.response?.data?.message ?? err.message;
      toast.error(message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof resetPasswordSchema>) => {
    mutation.mutate({ token, newPassword: data.newPassword });
  };

  return (
    <div className="auth-input-dark w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-3">
          <ShieldCheckIcon className="text-[#9FA7FF] w-10 h-10" />
        </div>
        <h2 className="text-[#F1F0F4] font-bold text-2xl mb-2">
          Reset your password
        </h2>
        <p className="text-[#ABAAAE] text-sm">
          Create a strong new password for your account. Make sure it&apos;s at
          least 8 characters and includes uppercase, lowercase, a number, and a
          special character.
        </p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-6 mb-4">
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    New password
                  </FieldLabel>
                  <InputGroup className="bg-black rounded-lg px-3 py-4 border-[#ABAAAE]">
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type={showPassword ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      className="text-[#ABAAAE]"
                    />
                    <InputGroupAddon align="inline-start">
                      <LockIcon className="text-[#ABAAAE]" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        onClick={() => setShowPassword((p) => !p)}
                        type="button"
                        variant="ghost"
                        className="cursor-pointer rounded-full"
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    Confirm new password
                  </FieldLabel>
                  <InputGroup className="bg-black rounded-lg px-3 py-4 border-[#ABAAAE]">
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type={showConfirm ? 'text' : 'password'}
                      aria-invalid={fieldState.invalid}
                      className="text-[#ABAAAE]"
                    />
                    <InputGroupAddon align="inline-start">
                      <LockIcon className="text-[#ABAAAE]" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        onClick={() => setShowConfirm((p) => !p)}
                        type="button"
                        variant="ghost"
                        className="cursor-pointer rounded-full"
                      >
                        {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                      </Button>
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
              disabled={mutation.isPending}
              className="mb-6 cursor-pointer rounded-full py-5 bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
            >
              {mutation.isPending ? 'Resetting…' : 'Reset Password'}
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

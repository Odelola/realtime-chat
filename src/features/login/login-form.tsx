import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
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
  FieldSeparator,
  FieldGroup,
  FieldDescription,
} from '@/components';
import { loginSchema } from './validation/login-schema';
import { useLoginMutation } from './hooks/use-login-mutation';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { useState } from 'react';

import * as yup from 'yup';

export const LoginForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const mutation = useLoginMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(['email'], data.email);
      localStorage.setItem('pendingOTPEmail', data.email);
      navigate('/verify-otp');
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message = axiosErr.response?.data?.message ?? err.message;
      toast.error(message, { theme: 'colored' });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data: yup.InferType<typeof loginSchema>) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-6 mb-6">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                    >
                      Password
                    </FieldLabel>
                    <Link
                      to="/forgot-password"
                      className="ml-auto underline-offset-4 tracking-[1px] text-[#9FA7FF] uppercase text-[0.625em] hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                        onClick={togglePasswordVisibility}
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
          </div>
          <Field className="mb-2">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer rounded-full py-5 bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
            >
              {mutation.isPending ? 'Signing in…' : 'Sign In'}
            </Button>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-[#121316] uppercase">
            Or continue with
          </FieldSeparator>
          <Field className="my-4 gap-4 md:flex-row">
            <Button
              variant="outline"
              type="button"
              className="group cursor-pointer py-5 bg-[#24262A] text-[#F1F0F4] rounded-md md:basis-1/2"
            >
              <img src="/images/google.svg" alt="Google icon" className="group-hover:invert" />
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              className="group cursor-pointer py-5 bg-[#24262A] text-[#F1F0F4] rounded-md md:basis-1/2"
            >
              <img src="/images/github.svg" alt="GitHub icon" className="group-hover:invert" />
              GitHub
            </Button>
          </Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="no-underline">
              <span className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] no-underline hover:underline hover:text-[#9FA7FF]">
                Sign up for free
              </span>
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
};

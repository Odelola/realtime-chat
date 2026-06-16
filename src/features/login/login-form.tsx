import { Link, useNavigate } from 'react-router-dom';

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
import useAuthStore from '@/store/auth-store';
import { type LoginBody } from './types/auth';
import { useLoginMutation } from './hooks/use-login-mutation';
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import * as yup from 'yup';

export const LoginForm = () => {
  
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { setIsAuthenticated } = useAuthStore((state) => state);
  const form = useForm<yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const mutation = useLoginMutation({
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = (data: yup.InferType<typeof loginSchema>) => {
    mutation.mutate(data);
  };
  const navigate = useNavigate()

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-6 mb-4">
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    Email or username
                  </FieldLabel>
                  <InputGroup className="bg-black rounded-lg px-3 py-4 border-[#ABAAAE]">
                    <InputGroupInput
                      {...field}
                      id={field.name}
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
                <Field className="" data-invalid={fieldState.invalid}>
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
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-[#121316] uppercase">
            Or continue with
          </FieldSeparator>
          <Field className="my-4 gap-4 md:flex-row">
            <Button
              variant="outline"
              type="button"
              className="cursor-pointer py-5 bg-[#24262A] text-[#F1F0F4] rounded-md md:basis-1/2"
            >
              <img src="/images/google.svg" alt="Google icon" />
              Google
            </Button>
            <Button
              variant="outline"
              type="button"
              className="cursor-pointer py-5 bg-[#24262A] text-[#F1F0F4] rounded-md md:basis-1/2"
            >
              <img src="/images/github.svg" alt="Github icon" />
              Github
            </Button>
          </Field>
          <Field>
            <Button
              type="submit"
              className="mb-6 cursor-pointer rounded-full py-5 bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
           onClick={() => navigate('/chat-layout')} >
              Login
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="no-underline">
                <span className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] no-underline hover:underline hover:text-[#9FA7FF]">
                  Sign up
                </span>
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

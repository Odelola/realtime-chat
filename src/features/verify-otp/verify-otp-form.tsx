import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
  FieldDescription,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components';
import { verifyOTPSchema } from './validation/verify-otp-schema';
import useAuthStore from '@/store/auth-store';
import { useVerifyOTPMutation } from './hooks/use-verify-otp-mutation';


import * as yup from 'yup';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

export const VerifyOTPForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const email =
    queryClient.getQueryData<string>(['email']) ||
    localStorage.getItem('pendingOTPEmail') ||
    '';

  const { setIsAuthenticated, setTokens } = useAuthStore((state) => state);

  const form = useForm<yup.InferType<typeof verifyOTPSchema>>({
    resolver: yupResolver(verifyOTPSchema),
    defaultValues: {
      otpCode: '',
    },
  });

  const mutation = useVerifyOTPMutation({
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      setIsAuthenticated(true);
      localStorage.removeItem('pendingOTPEmail');
      navigate('/chat-layout');
    },
    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof verifyOTPSchema>) => {
    mutation.mutate({ otpCode: data.otpCode, email });
  };

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-4 mb-4">
            <Controller
              name="otpCode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    One-Time Password
                  </FieldLabel>
                  <div className="flex justify-start py-2 [--foreground:0_0%_100%]">
                    <InputOTP
                      {...field}
                      id={field.name}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value}
                      onChange={field.onChange}
                      autoFocus
                      onComplete={form.handleSubmit(onSubmit)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={0} />
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={1} />
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={2} />
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={3} />
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={4} />
                        <InputOTPSlot className="size-14 text-lg text-[#ABAAAE]" index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
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
              {mutation.isPending ? 'Verifying…' : 'Verify Code'}
            </Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                Resend Code
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

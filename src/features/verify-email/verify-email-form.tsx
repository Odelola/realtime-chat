import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';

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
import { verifyEmailSchema } from './validation/verify-email-schema';
import { useVerifyEmailMutation } from './hooks/use-verify-email-mutation';
import { resendVerifyEmail } from './services/auth-service';
import { MailCheckIcon } from 'lucide-react';

import { useRef } from 'react';

import * as yup from 'yup';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

export const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const email = queryClient.getQueryData<string>(['email']) || '';

  const [searchParams] = useSearchParams();
  const urlToken = searchParams.get('token') || '';

  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<yup.InferType<typeof verifyEmailSchema>>({
    resolver: yupResolver(verifyEmailSchema),
    defaultValues: {
      token: urlToken,
    },
  });

  const mutation = useVerifyEmailMutation({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['email'] });
      navigate('/onboarding');
    },
    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => resendVerifyEmail(email),
    onSuccess: () => {
      toast.success('Verification code resent. Check your inbox.', {
        theme: 'colored',
      });
    },
    onError: (err: Error) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof verifyEmailSchema>) => {
    mutation.mutate({ token: data.token, email });
  };

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-3">
          <MailCheckIcon className="text-[#9FA7FF] w-10 h-10" />
        </div>
        <h2 className="text-[#F1F0F4] font-bold text-2xl mb-2">
          Verify your email
        </h2>
        <p className="text-[#ABAAAE] text-sm">
          We sent a 6-digit code to{' '}
          {email ? (
            <span className="text-[#9FA7FF]">{email}</span>
          ) : (
            'your email address'
          )}
          . Enter it below to verify your account.
        </p>
      </div>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <FieldGroup>
          <div className="space-y-4 mb-4">
            <Controller
              name="token"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="uppercase text-[#ABAAAE] font-medium text-xs tracking-[1.2px]"
                  >
                    Verification code
                  </FieldLabel>
                  <div className="flex justify-center py-2">
                    <InputOTP
                      {...field}
                      id={field.name}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      value={field.value}
                      onChange={field.onChange}
                      autoFocus
                      onComplete={() => formRef.current?.submit()}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot className="text-[#ABAAAE]" index={0} />
                        <InputOTPSlot className="text-[#ABAAAE]" index={1} />
                        <InputOTPSlot className="text-[#ABAAAE]" index={2} />
                        <InputOTPSlot className="text-[#ABAAAE]" index={3} />
                        <InputOTPSlot className="text-[#ABAAAE]" index={4} />
                        <InputOTPSlot className="text-[#ABAAAE]" index={5} />
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
              {mutation.isPending ? 'Verifying…' : 'Verify Email'}
            </Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{' '}
              <button
                type="button"
                disabled={resendMutation.isPending || !email}
                onClick={() => resendMutation.mutate()}
                className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] hover:underline cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resendMutation.isPending ? 'Sending…' : 'Resend Code'}
              </button>
            </FieldDescription>
            <FieldDescription className="text-center mt-2">
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

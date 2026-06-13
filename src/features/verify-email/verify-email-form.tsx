import { useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
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
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components';
import { verifyEmailSchema } from './validation/verify-email-schema';
import useAuthStore from '@/store/auth-store';
import { type VerifyEmailBody } from './types/auth';
import { useVerifyEmailMutation } from './hooks/use-verify-email-mutation';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useRef, useEffect } from 'react';

import * as yup from 'yup';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

export const VerifyEmailForm = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const email = queryClient.getQueryData<string>(['email']) || '';

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const formRef = useRef<HTMLFormElement>(null);

  const { setIsAuthenticated } = useAuthStore((state) => state);
  // const form = useForm<yup.InferType<typeof verifyEmailSchema>>({
  //   resolver: yupResolver(verifyEmailSchema),
  //   defaultValues: {
  //     token
  //   },
  // });

  const mutation = useVerifyEmailMutation({
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['email'] });

      navigate('/onboarding');
    },
    onError: (err) => {
      toast.error(err.message, { theme: 'colored' });
    },
  });

  // const onSubmit = (data: yup.InferType<typeof verifyEmailSchema>) => {
  //   mutation.mutate({ token: data.token, email });
  // };

  useEffect(() => {
    mutation.mutate({ token, email });
  }, []);

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      {/* <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} method="POST">
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
                    Token
                  </FieldLabel>
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
              Verify Code
            </Button>
            <FieldDescription className="text-center">
              Didn&apos;t receive the code?{' '}
              <Link to="#" className="no-underline">
                <span className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] no-underline hover:underline hover:text-[#9FA7FF]">
                  Resend Code
                </span>
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form> */}
    </div>
  );
};

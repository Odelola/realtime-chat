import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Button, FieldGroup, FieldDescription } from '@/components';
import { useVerifyEmailMutation } from './hooks/use-verify-email-mutation';
import { resendVerifyEmail } from './services/auth-service';
import { MailCheckIcon, LoaderCircleIcon, XCircleIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';

export const VerifyEmailForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const email = queryClient.getQueryData<string>(['email']) || '';

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const hasFired = useRef(false);

  const resendMutation = useMutation({
    mutationFn: () => resendVerifyEmail(email),
    onSuccess: () => {
      toast.success('Verification email resent. Check your inbox.', {
        theme: 'colored',
      });
    },
    onError: (err: Error) => {
      toast.error(err.message, { theme: 'colored' });
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

  useEffect(() => {
    if (hasFired.current || !token) return;
    hasFired.current = true;
    mutation.mutate({ token, email });
  }, [token, email]);

  return (
    <div className="w-[90%] bg-[#121316] my-8 p-8 rounded-md max-w-xl">
      <FieldGroup>
        <div className="flex flex-col items-center text-center gap-4">
          {mutation.isPending && (
            <>
              <LoaderCircleIcon className="text-[#9FA7FF] w-10 h-10 animate-spin" />
              <h2 className="text-[#F1F0F4] font-bold text-2xl">
                Verifying your email
              </h2>
              <p className="text-[#ABAAAE] text-sm">
                Please wait while we verify your email address…
              </p>
            </>
          )}

          {mutation.isError && (
            <>
              <XCircleIcon className="text-red-400 w-10 h-10" />
              <h2 className="text-[#F1F0F4] font-bold text-2xl">
                Verification failed
              </h2>
              <p className="text-[#ABAAAE] text-sm">
                The link may have expired or already been used. Request a new
                one below.
              </p>
              <Button
                type="button"
                disabled={mutation.isPending}
                onClick={() =>
                  email && mutation.mutate({ token, email })
                }
                className="cursor-pointer rounded-full py-5 bg-linear-to-r from-[#9FA7FF] to-[#8E98FF] text-[#000C9F] shadow-[0px_10px_15px_-3px_rgba(159,167,255,0.1),0px_4px_6px_-4px_rgba(159,167,255,0.1)]"
              >
                Try again
              </Button>
            </>
          )}

          {!mutation.isPending && !mutation.isError && (
            <>
              <MailCheckIcon className="text-[#9FA7FF] w-10 h-10" />
              <h2 className="text-[#F1F0F4] font-bold text-2xl">
                Verify your email
              </h2>
              <p className="text-[#ABAAAE] text-sm">
                Click the verification link sent to{' '}
                {email ? (
                  <span className="text-[#9FA7FF]">{email}</span>
                ) : (
                  'your email address'
                )}
                . The link will verify your account automatically.
              </p>
            </>
          )}

          <FieldDescription className="text-center mt-2">
            Didn&apos;t receive the email?{' '}
            <button
              type="button"
              disabled={resendMutation.isPending || !email}
              onClick={() => resendMutation.mutate()}
              className="text-[#9FA7FF] text-sm underline-offset-4 tracking-[1px] hover:underline cursor-pointer bg-transparent border-none p-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendMutation.isPending ? 'Sending…' : 'Resend verification email'}
            </button>
          </FieldDescription>

          <FieldDescription className="text-center">
            <Link to="/login" className="no-underline">
              <span className="text-[#ABAAAE] text-sm underline-offset-4 tracking-[1px] hover:underline hover:text-[#9FA7FF]">
                Back to login
              </span>   
          
            </Link>
          </FieldDescription>
        </div>
      </FieldGroup>
    </div>
  );
};

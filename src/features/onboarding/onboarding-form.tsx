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
  Input,
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  FieldSeparator,
  FieldGroup,
  FieldDescription,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
} from '@/components';

import { onboardingSchema } from './validation/onboarding-schema';
import useAuthStore from '@/store/auth-store';
import { type OnboardingBody } from './types/auth';
import { useOnboardingMutation } from './hooks/use-onboarding-mutation';
import {
  ArrowRightIcon,
  BriefcaseIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from 'lucide-react';

import * as yup from 'yup';
import { AvatarUpload } from './avatar-upload';

export const OnboardingForm = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);

  const form = useForm<OnboardingBody>({
    // yupResolver has a slightly incompatible generic; cast to any to satisfy TS
    resolver: yupResolver(onboardingSchema) as any,
    defaultValues: {
      workspace_name: '',
      display_name: '',
      role: '',
      avatar: undefined,
    },
  });

  const mutation = useOnboardingMutation({
    onSuccess: () => {
      setIsAuthenticated(true);
    },
    onError: (err) => {
      const axiosErr = err as AxiosError<{ message?: string }>;
      const message = axiosErr.response?.data?.message ?? err.message;
      toast.error(message, { theme: 'colored' });
    },
  });

  const onSubmit = (data: yup.InferType<typeof onboardingSchema>) => {
    mutation.mutate(data);
  };

  return (
    <Card className="onboarding-input-dark bg-[#2A2833]/50 w-120 border border-[#2A2833]">
      <CardHeader className="text-center pt-2.5 pb-2">
        <CardTitle className="text-white font-bold text-3xl mb-2">
          Welcome to Nexus Slate
        </CardTitle>
        <CardDescription className="text-[#7C7296]">
          Let's set up your workspace and get you ready for deep work.
        </CardDescription>
      </CardHeader>
      <ScrollArea className="h-60 border-t border-[#2A2833] py-4">
        <CardContent>
          <form
            id="onboarding-form"
            onSubmit={form.handleSubmit(onSubmit)}
            method="POST"
            className="flex flex-col gap-y-6"
          >
            <FieldGroup>
              <div className="flex items-center gap-2">
                <span className="size-6 flex items-center justify-center bg-[#8069BF] text-white rounded-full text-xs font-bold p-1">
                  1
                </span>
                <span className="text-sm font-bold text-white">
                  Name your workspace
                </span>
              </div>
              <Controller
                name="workspace_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="" data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor={field.name}
                      className="uppercase text-[#7C7296] font-medium text-xs tracking-[1.2px]"
                    >
                      Workspace name
                    </FieldLabel>
                    <InputGroup className="bg-[#0D0D12] border border-[#2A2833] py-5 px-2">
                      <InputGroupInput
                        {...field}
                        id={field.name}
                        placeholder="Acme Corp"
                        aria-invalid={fieldState.invalid}
                        className="text-white"
                      />
                      <InputGroupAddon align="inline-start">
                        <BriefcaseIcon />
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldSeparator />
            <div className="flex items-center gap-2">
              <span className="size-6 flex items-center justify-center bg-[#8069BF] text-white rounded-full text-xs font-bold p-1">
                2
              </span>
              <span className="text-sm font-bold text-white">
                Set up your profile
              </span>
            </div>
            <div className="flex">
              <FieldGroup className="w-60">
                <AvatarUpload name="avatar" control={form.control} />
              </FieldGroup>
              <FieldGroup>
                <Controller
                  name="display_name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="uppercase text-[#7C7296] font-medium text-xs tracking-[1.2px]"
                      >
                        Display name
                      </FieldLabel>
                      <InputGroup className="bg-[#0D0D12] border border-[#2A2833] py-5 px-2">
                        <InputGroupInput
                          {...field}
                          id={field.name}
                          placeholder="John Doe"
                          aria-invalid={fieldState.invalid}
                          className="text-white"
                        />
                        <InputGroupAddon align="inline-start">
                          <UserIcon />
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="role"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="" data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="uppercase text-[#7C7296] font-medium text-xs tracking-[1.2px]"
                      >
                        Role (optional)
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="e.g. Senior Frontend Engineer"
                        aria-invalid={fieldState.invalid}
                        className="bg-[#0D0D12] border border-[#2A2833] py-5 px-2 text-white"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </form>
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex justify-between bg-[#0D0D12]/50 border-[#2A2833]">
        <Button variant="link" className="text-[#7C7296] cursor-pointer" asChild>
          <Link to="/chat">Skip for now</Link>
        </Button>
        <Button
          type="submit"
          form="onboarding-form"
          className="bg-[#8069BF] p-4 cursor-pointer"
        >
          Enter Workspace <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

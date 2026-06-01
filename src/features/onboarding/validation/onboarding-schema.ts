import * as yup from 'yup';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const onboardingSchema = yup.object().shape({
  workspace_name: yup
    .string()
    .trim()
    .required('Workspace name is required.')
    .max(40, 'Workspace name should not exceed 40 characters.'),
  display_name: yup
    .string()
    .trim()
    .required('Display name is required.')
    .max(40, 'Display name should not exceed 40 characters.'),
  role: yup
    .string()
    .trim()
    .optional()
    .max(40, 'Role should not exceed 40 characters.'),
  avatar: yup
    .mixed<File>()
    .optional()
    .test(
      "fileSize",
      "Image must be 5MB or smaller",
      (file) => !file || file.size <= MAX_FILE_SIZE
    )
    .test(
      "fileType",
      "Must be a JPG, PNG, or WebP image",
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type)
    ),
});

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full Name must be at least 2 characters')
    .max(50, 'Full Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must be at most 200 characters').optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const UserProfileSettings: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      bio: '',
    },
    mode: 'onTouched',
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const bioValue = watch('bio') || '';

  const onSubmit = async (data: FormValues) => {
    setSubmitSuccess(false);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form submitted successfully:', data);
    setSubmitSuccess(true);
  };

  const inputStyles =
    'w-full px-4 py-2 border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Settings</h2>
      
      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm" role="alert">
          Profile updated successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('fullName')}
            id="fullName"
            type="text"
            className={`${inputStyles} ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            onBlur={(e) => {
              setValue('email', e.target.value.toLowerCase(), { shouldValidate: true });
            }}
            className={`${inputStyles} ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            {...register('bio')}
            id="bio"
            rows={4}
            className={`${inputStyles} resize-none ${errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
            aria-invalid={errors.bio ? 'true' : 'false'}
            aria-describedby={errors.bio ? 'bio-error' : undefined}
          />
          <div className="flex justify-between items-center mt-1">
            <p id="bio-error" className="text-sm text-red-500 min-h-[1.25rem]">
              {errors.bio?.message}
            </p>
            <span
              className={`text-xs ${
                bioValue.length > 200 ? 'text-red-500 font-medium' : 'text-gray-500'
              }`}
            >
              {bioValue.length}/200
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

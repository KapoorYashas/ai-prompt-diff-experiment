import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Camera, Mail, User, Link as LinkIcon, Save, Info, AlertCircle, CheckCircle2 } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(160, 'Bio must be less than 160 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function UserProfileSettings() {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'Jane Doe',
      username: 'janedoe',
      email: 'jane@example.com',
      bio: 'Frontend enthusiast and UI designer. Creating beautiful digital experiences.',
      website: 'https://janedoe.com',
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Profile updated:', data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-8 font-sans text-slate-200">
      <div className="w-full max-w-2xl relative">
        {/* Abstract background blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Main form container */}
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Profile Settings
              </h2>
              <p className="text-slate-400 mt-2 text-sm">
                Update your personal information and how others see you on the platform.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700 flex items-center justify-center transition-all duration-300 group-hover:border-blue-500">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-500" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors shadow-lg border border-slate-900">
                    <Camera className="w-4 h-4 text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  </label>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-sm font-medium text-slate-300">Profile Picture</h3>
                  <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              {/* Grid for Name & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-500" />
                    Full Name
                  </label>
                  <input
                    {...register('fullName')}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-500" />
                    Username
                  </label>
                  <input
                    {...register('username')}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                    placeholder="janedoe"
                  />
                  {errors.username && (
                    <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  placeholder="jane@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-slate-500" />
                  Website
                </label>
                <input
                  {...register('website')}
                  type="url"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                  placeholder="https://janedoe.com"
                />
                {errors.website && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.website.message}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-slate-500" />
                  Bio
                </label>
                <textarea
                  {...register('bio')}
                  rows={4}
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none"
                  placeholder="Tell us a little bit about yourself..."
                />
                {errors.bio && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex-1">
                  {isSubmitSuccessful && (
                    <p className="text-emerald-400 text-sm flex items-center gap-2 animate-pulse">
                      <CheckCircle2 className="w-4 h-4" />
                      Changes saved successfully!
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white transition-all duration-300 bg-blue-600 border border-blue-500 rounded-xl hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  )}
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

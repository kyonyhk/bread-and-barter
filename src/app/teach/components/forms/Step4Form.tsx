'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import { supabase } from '@repo/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from '../../../../../styled-system/css';
import { useTeachForm } from '../../context/TeachFormContext';

export function Step4Form() {
  const router = useRouter();
  const { formData, updateFormData } = useTeachForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.push('/teach/3');
  };

  const handleFinish = async () => {
    try {
      setError('');
      setIsLoading(true);

      // Validate form data
      if (!formData.email || !formData.password) {
        setError('Please fill in all required fields');
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      // First try to sign in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      let userId;

      // If sign in fails due to invalid credentials, try to sign up
      if (signInError && signInError.message === 'Invalid login credentials') {
        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
              data: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                description: formData.description,
                is_teacher: true,
              },
            },
          });

        if (signUpError) {
          console.error('Sign up error:', signUpError);
          throw new Error(signUpError.message);
        }

        if (!signUpData?.user) {
          throw new Error('Failed to create user account');
        }

        userId = signUpData.user.id;
      } else if (signInError) {
        throw signInError;
      } else {
        userId = signInData.user.id;
      }

      // Create the program
      const { data: programData, error: programError } = await supabase
        .from('programs')
        .insert({
          teacher_id: userId,
          name: formData.courseName,
          description: '',
          status: 'draft',
        })
        .select()
        .single();

      if (programError) {
        console.error('Program creation error:', programError);
        throw new Error('Failed to create program');
      }

      if (!programData) {
        throw new Error('Program data is missing');
      }

      // Create the first course
      const { error: courseError } = await supabase.from('courses').insert({
        program_id: programData.id,
        name: formData.lessonName,
        price: parseFloat(formData.lessonFees) || 0,
        course_number: 1,
        duration: '',
        course_details: '',
        max_students: 1,
        is_group_session: false,
        location: 'To be determined',
      });

      if (courseError) {
        console.error('Course creation error:', courseError);
        throw new Error('Failed to create course');
      }

      // Redirect to the program page
      router.push(`/programs/${programData.id}`);
    } catch (error) {
      console.error('Error during sign up:', error);
      setError(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '120px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        })}
      >
        <div>
          <div className={css({ textStyle: 'subheading1' })}>
            Create your account
          </div>
          <div
            className={css({
              textStyle: 'subheading4',
              color: 'yellow50',
              mt: '8px',
            })}
          >
            Set up your account to start teaching.
          </div>
        </div>

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          placeholder="Enter your password"
        />

        {error && (
          <div className={css({ color: 'red100', textStyle: 'paragraph2' })}>
            {error}
          </div>
        )}
      </div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'flex-end',
          mt: '16px',
        })}
      >
        <ButtonMedium onClick={handleBack} variant="yellow">
          <LeftArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
          Back
        </ButtonMedium>
        <ButtonMedium onClick={handleFinish} disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
          <RightArrow
            className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
          />
        </ButtonMedium>
      </div>
    </div>
  );
}

'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { useAuth } from '../AuthContext';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', {
      email,
      password,
      firstName,
      lastName,
    });
    setError('');
    setIsLoading(true);

    try {
      console.log('Attempting to sign up...');
      await signUp(email, password, firstName, lastName);
      console.log('Sign up successful!');
      router.push(
        '/auth/signin?message=Please check your email to verify your account'
      );
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Error creating account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={css({
        display: 'flex',
        h: '85vh',
        bg: 'black',
        color: 'yellow100',
        marginTop: '80px ',
        gap: '0px',
        padding: '40px 40px 40px 120px',
      })}
    >
      {/* Left Column */}
      <div
        className={css({
          w: '50%',
          position: 'sticky',
          top: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bg: 'black',
        })}
      >
        <div
          className={css({
            position: 'relative',
            w: '100%',
            h: '100%',
            borderRadius: '40px',
            overflow: 'hidden',
            borderColor: 'yellow20',
            borderWidth: '1px',
          })}
        >
          <img
            src="/images/running-with-surfboard.png"
            alt="running with surfboard"
            className={css({
              w: '100%',
              h: '100%',
              objectFit: 'cover',
            })}
          />
          <div
            className={css({
              position: 'absolute',
              top: '120px',
              left: '40px',
              right: '40px',
            })}
          >
            <div className={css({ textStyle: 'heading2' })}>
              Welcome to the learning culture.
            </div>
            <div
              className={css({
                textStyle: 'subheading3',
                color: 'yellow50',
                mt: '8px',
              })}
            >
              Every new lesson opens a door to a world of endless possibilities.
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div
        className={css({
          w: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
        })}
      >
        <form
          onSubmit={handleSubmit}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'center',
            // alignItems: 'center',
            w: '480px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              w: '100%',
            })}
          >
            <Input
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div
            className={css({
              display: 'flex ',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '4px',
            })}
          >
            <ButtonMedium
              type="submit"
              disabled={isLoading}
              className={css({ w: '240px', bg: 'yellow20' })}
            >
              {isLoading ? 'Creating account...' : 'Sign up'}
              <RightArrow
                className={css({
                  fill: 'yellow100',
                  w: '24px',
                  h: '24px',
                })}
              />
            </ButtonMedium>

            <div className={css({ textAlign: 'left' })}>
              <span className={css({ color: 'yellow50' })}>
                Already have an account?{' '}
              </span>
              <Link
                href="/auth/signin"
                className={css({
                  color: 'altyellow',
                  _hover: {
                    color: 'yellow100',
                    transition: 'all 0.2 ease-in-out',
                  },
                })}
              >
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

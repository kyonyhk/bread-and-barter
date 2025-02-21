'use client';

import ButtonMedium from '@repo/components/atoms/buttons/ButtonMedium';
import { RightArrow } from '@repo/components/atoms/icons';
import Input from '@repo/components/atoms/input/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from '../../../../styled-system/css';
import { useAuth } from '../AuthContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push('/home');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={css({
        h: '100vh',
        w: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '80px',
      })}
    >
      {/* Tagline */}
      <div
        className={css({
          position: 'absolute',
          bottom: '50vh',
          left: 'auto',
          right: 'auto',
          color: 'yellow100',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          maxW: '800px',
          padding: '0px 80px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          })}
        >
          <div className={css({ textStyle: 'heading3', textAlign: 'center' })}>
            Share Your Skills,
          </div>
          <div className={css({ textStyle: 'heading3', textAlign: 'center' })}>
            Shape the Future
          </div>
        </div>
        <div className={css({ textStyle: 'subheading4', color: 'yellow50' })}>
          Join our community of learners and teachers
        </div>
      </div>

      {/* Cover Photo */}
      <div
        className={css({
          h: '60vh',
          w: '100vw',
          borderWidth: '1px',
          overflow: 'hidden',
          position: 'relative',
          border: 'none',
        })}
      >
        <img
          src="/images/login.jpg"
          alt="tress in a forest"
          className={css({
            w: '100%',
            h: '100%',
            objectFit: 'cover',
          })}
        />
        <div
          className={css({
            w: '100%',
            h: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 5,
            background:
              'linear-gradient(0deg, rgba(0, 0, 0, 0.80) 15%, rgba(0, 0, 0, 0.00) 75%)',
          })}
        ></div>
      </div>

      {/* Login Container */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          w: '640px',
          gap: '24px',
        })}
      >
        {/* <div className={css({ textStyle: 'subheading4', color: 'yellow100' })}>
          Let's get started
        </div> */}
        <form
          onSubmit={handleSubmit}
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            })}
          >
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

            {error && (
              <div
                className={css({
                  color: 'red100',
                  textStyle: 'paragraph1',
                  textAlign: 'center',
                })}
              >
                {error}
              </div>
            )}
          </div>

          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              minW: '480px',
            })}
          >
            <ButtonMedium
              type="submit"
              disabled={isLoading}
              className={css({ w: '240px' })}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
              <RightArrow
                className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
              />
            </ButtonMedium>

            <div className={css({ textAlign: 'center' })}>
              <span className={css({ color: 'yellow50' })}>
                Don't have an account?{' '}
              </span>
              <Link
                href="/auth/signup"
                className={css({
                  color: 'altyellow',
                  _hover: {
                    color: 'yellow100',
                    transition: 'all 0.2 ease-in-out',
                  },
                })}
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

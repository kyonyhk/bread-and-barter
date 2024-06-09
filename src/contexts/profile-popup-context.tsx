'use client';

import { FC, ReactNode, createContext, useContext, useState } from 'react';

interface ProfilePopupContextProps {
  isProfilePopupOpen: boolean;
  toggleProfilePopup: () => void;
}

const ProfilePopupContext = createContext<ProfilePopupContextProps | undefined>(
  undefined
);

interface ProfilePopupProviderProps {
  children: ReactNode;
}

export const ProfilePopupProvider: FC<ProfilePopupProviderProps> = ({
  children,
}) => {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen((prev) => !prev);
  };

  return (
    <ProfilePopupContext.Provider
      value={{ isProfilePopupOpen, toggleProfilePopup }}
    >
      {children}
    </ProfilePopupContext.Provider>
  );
};

export const useProfilePopup = () => {
  const context = useContext(ProfilePopupContext);
  if (!context) {
    throw new Error(
      'useProfilePopup must be used within a ProfilePopupProvider'
    );
  }
  return context;
};

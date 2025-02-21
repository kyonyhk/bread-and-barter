'use client';

import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface TeachFormData {
  // Step 1
  firstName: string;
  lastName: string;
  description: string;
  // Step 2
  courseName: string;
  // Step 3
  lessonName: string;
  lessonFees: string;
  // Step 4
  email: string;
  password: string;
}

const INITIAL_FORM_DATA: TeachFormData = {
  firstName: '',
  lastName: '',
  description: '',
  courseName: '',
  lessonName: '',
  lessonFees: '',
  email: '',
  password: '',
};

interface TeachFormContextType {
  formData: TeachFormData;
  updateFormData: (data: Partial<TeachFormData>) => void;
  clearFormData: () => void;
}

const TeachFormContext = createContext<TeachFormContextType | undefined>(
  undefined
);

interface TeachFormProviderProps {
  children: ReactNode;
}

export const TeachFormProvider: FC<TeachFormProviderProps> = ({ children }) => {
  // Initialize state from session storage or default values
  const [formData, setFormData] = useState<TeachFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('teachFormData');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved form data:', e);
        }
      }
    }
    return INITIAL_FORM_DATA;
  });

  // Save to session storage whenever form data changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('teachFormData', JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (data: Partial<TeachFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const clearFormData = () => {
    setFormData(INITIAL_FORM_DATA);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('teachFormData');
    }
  };

  return (
    <TeachFormContext.Provider
      value={{ formData, updateFormData, clearFormData }}
    >
      {children}
    </TeachFormContext.Provider>
  );
};

export function useTeachForm() {
  const context = useContext(TeachFormContext);
  if (!context) {
    throw new Error('useTeachForm must be used within a TeachFormProvider');
  }
  return context;
}

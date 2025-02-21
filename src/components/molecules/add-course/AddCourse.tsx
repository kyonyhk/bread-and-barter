import TileButton from '@repo/components/atoms/buttons/TileButton';
import TextInput from '@repo/components/atoms/input/Input';
import EditActions from '@repo/components/molecules/edit-actions/EditActions';
import { ChangeEvent, useState } from 'react';
import { css } from '../../../../styled-system/css';

interface AddCourseProps {
  isAddingCourse: boolean;
  onAddClick: () => void;
  onAdd: (courseName: string, price: number) => void;
  onCancel: () => void;
}

export default function AddCourse({
  isAddingCourse,
  onAddClick,
  onAdd,
  onCancel,
}: AddCourseProps) {
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    // Validate inputs
    if (!courseName.trim()) {
      setError('Course name is required');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // Clear error and call onAdd
    setError(null);
    onAdd(courseName.trim(), priceNumber);

    // Reset form
    setCourseName('');
    setPrice('');
  };

  if (!isAddingCourse) {
    return (
      <TileButton
        title="Add New Course"
        subtitle="Create a new course for this program"
        onClick={onAddClick}
        className={css({
          borderRadius: '16px',
        })}
      />
    );
  }

  const isSaveDisabled = !courseName.trim() || !price || parseFloat(price) <= 0;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '16px',
        bg: 'yellow5',
      })}
    >
      <div>
        <div className={css({ textStyle: 'subheading4', color: 'yellow100' })}>
          Add New Course
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            mt: '16px',
          })}
        >
          <TextInput
            label="Course Name"
            value={courseName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCourseName(e.target.value)
            }
            placeholder="Enter course name"
            error={
              error && !courseName.trim()
                ? 'Course name is required'
                : undefined
            }
          />
          <TextInput
            label="Price"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              // Allow only numbers and decimal point
              if (/^\d*\.?\d*$/.test(value)) {
                setPrice(value);
              }
            }}
            placeholder="Enter price"
            type="number"
            min="0"
            step="0.01"
            error={
              error && (!price || parseFloat(price) <= 0)
                ? 'Please enter a valid price'
                : undefined
            }
          />
        </div>
      </div>
      <EditActions
        onSave={handleSave}
        onCancel={onCancel}
        isSaveDisabled={isSaveDisabled}
      />
    </div>
  );
}

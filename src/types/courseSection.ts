// Course Details Section Types
export interface CourseDetailsSaveData {
  duration: string;
  courseDetails: string;
}

// Course Objectives Section Types
export interface CourseObjectiveSaveData {
  objective_number: number;
  objective_text: string;
}

// Course Timeslots Section Types
export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

export interface CourseTimeslotsSaveData {
  course_id: string;
  timeslots: DaySchedule[];
}

// Course Credentials Section Types
export interface CourseCredentialsSaveData {
  experience: string;
}

// Course Materials Section Types
export interface CourseMaterialSaveData {
  name: string;
  file_url: string;
}

// Generic state change handler type
export type OnStateChangeHandler<T> = (data: T | null) => void;

// Common section props interface
export interface CourseSectionProps {
  isEditing: boolean;
  onEdit?: () => void;
  onSave: () => void;
  onCancel: () => void;
  isSaved: boolean;
  isCancelled: boolean;
}

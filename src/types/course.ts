export interface Course {
  id: string;
  course_number: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  course_details: string;
  max_students: number;
  is_group_session: boolean;
  location: string;
  credentials_experience: string;
  requirements: string;
  image_url: string;
  course_objectives: Array<{
    objective_number: number;
    objective_text: string;
  }>;
  course_materials: Array<{
    name: string;
    file_url: string;
  }>;
  course_timeslots: Array<{
    day: string;
    slots: Array<{
      startTime: string;
      endTime: string;
    }>;
  }>;
}

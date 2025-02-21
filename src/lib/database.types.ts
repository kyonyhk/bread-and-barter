export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Auth Schema
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          first_name: string;
          last_name: string;
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          occupation: string | null;
          interests: string[];
          description: string | null;
          is_teacher: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          first_name: string;
          last_name: string;
          gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          occupation?: string;
          interests: string[];
          description?: string;
          is_teacher?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          password_hash?: string;
          first_name?: string;
          last_name?: string;
          gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
          occupation?: string;
          interests?: string[];
          description?: string;
          is_teacher?: boolean;
          updated_at?: string;
        };
      };
      // Teaching Schema
      programs: {
        Row: {
          id: string;
          teacher_id: string;
          name: string;
          description: string | null;
          status: 'draft' | 'pending_review' | 'approved' | 'rejected';
          review_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          teacher_id: string;
          name: string;
          description?: string;
          status?: 'draft' | 'pending_review' | 'approved' | 'rejected';
          review_notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          teacher_id?: string;
          name?: string;
          description?: string;
          status?: 'draft' | 'pending_review' | 'approved' | 'rejected';
          review_notes?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          program_id: string;
          course_number: number;
          name: string;
          description: string | null;
          price: number;
          duration: string;
          course_details: string;
          max_students: number;
          is_group_session: boolean;
          location: string;
          credentials_experience: string | null;
          requirements: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          program_id: string;
          course_number: number;
          name: string;
          description?: string;
          price: number;
          duration: string;
          course_details: string;
          max_students: number;
          is_group_session?: boolean;
          location: string;
          credentials_experience?: string;
          requirements?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          program_id?: string;
          course_number?: number;
          name?: string;
          description?: string;
          price?: number;
          duration?: string;
          course_details?: string;
          max_students?: number;
          is_group_session?: boolean;
          location?: string;
          credentials_experience?: string;
          requirements?: string;
          updated_at?: string;
        };
      };
      // ... continue with other tables
    };
  };
}

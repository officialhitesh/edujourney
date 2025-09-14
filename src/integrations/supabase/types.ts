export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      assessments: {
        Row: {
          answers: Json
          assessment_type: string
          completed_at: string
          created_at: string
          id: string
          personality_traits: Json | null
          questions: Json
          scores: Json
          user_id: string
        }
        Insert: {
          answers: Json
          assessment_type?: string
          completed_at?: string
          created_at?: string
          id?: string
          personality_traits?: Json | null
          questions: Json
          scores: Json
          user_id: string
        }
        Update: {
          answers?: Json
          assessment_type?: string
          completed_at?: string
          created_at?: string
          id?: string
          personality_traits?: Json | null
          questions?: Json
          scores?: Json
          user_id?: string
        }
        Relationships: []
      }
      career_roadmaps: {
        Row: {
          avg_salary_max: number | null
          avg_salary_min: number | null
          certifications: Json
          created_at: string
          entry_roles: Json
          higher_studies: Json
          id: string
          projects: Json
          skills: Json
          specialization_id: string
          top_companies: Json
          updated_at: string
        }
        Insert: {
          avg_salary_max?: number | null
          avg_salary_min?: number | null
          certifications?: Json
          created_at?: string
          entry_roles?: Json
          higher_studies?: Json
          id?: string
          projects?: Json
          skills?: Json
          specialization_id: string
          top_companies?: Json
          updated_at?: string
        }
        Update: {
          avg_salary_max?: number | null
          avg_salary_min?: number | null
          certifications?: Json
          created_at?: string
          entry_roles?: Json
          higher_studies?: Json
          id?: string
          projects?: Json
          skills?: Json
          specialization_id?: string
          top_companies?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "career_roadmaps_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
        ]
      }
      colleges: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_phone: string | null
          courses_offered: string[] | null
          created_at: string
          facilities: string[] | null
          id: string
          image_url: string | null
          is_government: boolean | null
          location_city: string | null
          location_district: string | null
          location_state: string | null
          name: string
          rating: number | null
          website: string | null
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          courses_offered?: string[] | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          image_url?: string | null
          is_government?: boolean | null
          location_city?: string | null
          location_district?: string | null
          location_state?: string | null
          name: string
          rating?: number | null
          website?: string | null
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          courses_offered?: string[] | null
          created_at?: string
          facilities?: string[] | null
          id?: string
          image_url?: string | null
          is_government?: boolean | null
          location_city?: string | null
          location_district?: string | null
          location_state?: string | null
          name?: string
          rating?: number | null
          website?: string | null
        }
        Relationships: []
      }
      degrees: {
        Row: {
          code: string
          created_at: string
          description: string | null
          duration_years: number | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          duration_years?: number | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          duration_years?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          assessment_id: string | null
          confidence_score: number | null
          created_at: string
          id: string
          reasoning: string | null
          recommended_colleges: string[] | null
          recommended_courses: string[] | null
          recommended_streams: string[] | null
          user_id: string
        }
        Insert: {
          assessment_id?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          reasoning?: string | null
          recommended_colleges?: string[] | null
          recommended_courses?: string[] | null
          recommended_streams?: string[] | null
          user_id: string
        }
        Update: {
          assessment_id?: string | null
          confidence_score?: number | null
          created_at?: string
          id?: string
          reasoning?: string | null
          recommended_colleges?: string[] | null
          recommended_courses?: string[] | null
          recommended_streams?: string[] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["id"]
          },
        ]
      }
      specializations: {
        Row: {
          code: string
          created_at: string
          degree_id: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string
          degree_id: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string
          degree_id?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "specializations_degree_id_fkey"
            columns: ["degree_id"]
            isOneToOne: false
            referencedRelation: "degrees"
            referencedColumns: ["id"]
          },
        ]
      }
      streams: {
        Row: {
          career_prospects: string[] | null
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          requirements: string[] | null
        }
        Insert: {
          career_prospects?: string[] | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          requirements?: string[] | null
        }
        Update: {
          career_prospects?: string[] | null
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          requirements?: string[] | null
        }
        Relationships: []
      }
      student_form: {
        Row: {
          career_interest: string
          class: string
          created_at: string
          exam_preference: string
          id: string
          interests: string
          marks: string
          name: string
          stream: string | null
          user_id: string
          weak_subjects: string | null
        }
        Insert: {
          career_interest: string
          class: string
          created_at?: string
          exam_preference: string
          id?: string
          interests: string
          marks: string
          name: string
          stream?: string | null
          user_id: string
          weak_subjects?: string | null
        }
        Update: {
          career_interest?: string
          class?: string
          created_at?: string
          exam_preference?: string
          id?: string
          interests?: string
          marks?: string
          name?: string
          stream?: string | null
          user_id?: string
          weak_subjects?: string | null
        }
        Relationships: []
      }
      user_roadmaps: {
        Row: {
          created_at: string
          degree_id: string
          id: string
          roadmap_id: string
          specialization_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          degree_id: string
          id?: string
          roadmap_id: string
          specialization_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          degree_id?: string
          id?: string
          roadmap_id?: string
          specialization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roadmaps_degree_id_fkey"
            columns: ["degree_id"]
            isOneToOne: false
            referencedRelation: "degrees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roadmaps_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "career_roadmaps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roadmaps_specialization_id_fkey"
            columns: ["specialization_id"]
            isOneToOne: false
            referencedRelation: "specializations"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          class_level: number | null
          created_at: string
          email: string
          gender: string | null
          id: string
          interests: string[] | null
          location_district: string | null
          location_state: string | null
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          class_level?: number | null
          created_at?: string
          email: string
          gender?: string | null
          id?: string
          interests?: string[] | null
          location_district?: string | null
          location_state?: string | null
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          class_level?: number | null
          created_at?: string
          email?: string
          gender?: string | null
          id?: string
          interests?: string[] | null
          location_district?: string | null
          location_state?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

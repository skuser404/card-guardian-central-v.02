export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bus_employees: {
        Row: {
          address: string | null
          created_at: string
          department: string
          employee_id: string
          experience_years: number | null
          full_name: string
          gender: string
          id: string
          phone_number: string | null
          remarks: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          department: string
          employee_id: string
          experience_years?: number | null
          full_name: string
          gender: string
          id?: string
          phone_number?: string | null
          remarks?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          department?: string
          employee_id?: string
          experience_years?: number | null
          full_name?: string
          gender?: string
          id?: string
          phone_number?: string | null
          remarks?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bus_routes: {
        Row: {
          arrival_time: string | null
          bus_id: string
          created_at: string
          departure_time: string | null
          id: string
          stop_id: string
          stop_order: number
        }
        Insert: {
          arrival_time?: string | null
          bus_id: string
          created_at?: string
          departure_time?: string | null
          id?: string
          stop_id: string
          stop_order: number
        }
        Update: {
          arrival_time?: string | null
          bus_id?: string
          created_at?: string
          departure_time?: string | null
          id?: string
          stop_id?: string
          stop_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "bus_routes_bus_id_fkey"
            columns: ["bus_id"]
            isOneToOne: false
            referencedRelation: "buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bus_routes_stop_id_fkey"
            columns: ["stop_id"]
            isOneToOne: false
            referencedRelation: "bus_stops"
            referencedColumns: ["id"]
          },
        ]
      }
      bus_stops: {
        Row: {
          created_at: string
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string | null
          name?: string
        }
        Relationships: []
      }
      buses: {
        Row: {
          bus_number: string
          capacity: number
          created_at: string
          id: string
          route: string | null
          status: string
          type: string
        }
        Insert: {
          bus_number: string
          capacity: number
          created_at?: string
          id?: string
          route?: string | null
          status?: string
          type: string
        }
        Update: {
          bus_number?: string
          capacity?: number
          created_at?: string
          id?: string
          route?: string | null
          status?: string
          type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name: string
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      salary_history: {
        Row: {
          amount: number
          created_at: string
          effective_date: string
          employee_id: string
          id: string
          remarks: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          effective_date: string
          employee_id: string
          id?: string
          remarks?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          effective_date?: string
          employee_id?: string
          id?: string
          remarks?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salary_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "bus_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          card_id: string
          created_at: string
          id: string
          route: string | null
          service: string
          transaction_date: string
          type: string
        }
        Insert: {
          amount: number
          card_id: string
          created_at?: string
          id?: string
          route?: string | null
          service: string
          transaction_date?: string
          type: string
        }
        Update: {
          amount?: number
          card_id?: string
          created_at?: string
          id?: string
          route?: string | null
          service?: string
          transaction_date?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "transport_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      transport_cards: {
        Row: {
          balance: number
          card_number: string
          created_at: string
          expiry_date: string
          id: string
          issue_date: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance?: number
          card_number: string
          created_at?: string
          expiry_date: string
          id?: string
          issue_date?: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance?: number
          card_number?: string
          created_at?: string
          expiry_date?: string
          id?: string
          issue_date?: string
          status?: string
          updated_at?: string
          user_id?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

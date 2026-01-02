export type IssueType = 
  | 'overflowing_bin'
  | 'illegal_dump'
  | 'blocked_drain'
  | 'litter'
  | 'other';

export type ReportStatus = 
  | 'reported'
  | 'acknowledged'
  | 'cleaned';

export type UserRole = 
  | 'resident'
  | 'volunteer'
  | 'admin';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface WasteReport {
  id: string;
  user_id: string;
  issue_type: IssueType;
  location: Location;
  photo_url?: string;
  status: ReportStatus;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name?: string;
  role: UserRole;
  created_at: string;
}

export interface ReportVote {
  id: string;
  user_id: string;
  report_id: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      waste_reports: {
        Row: WasteReport;
        Insert: Omit<WasteReport, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<WasteReport, 'id' | 'created_at'>>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      report_votes: {
        Row: ReportVote;
        Insert: Omit<ReportVote, 'id' | 'created_at'>;
        Update: never;
      };
    };
  };
}

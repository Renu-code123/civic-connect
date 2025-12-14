export type IssueStatus = 'pending' | 'in_progress' | 'resolved';
export type IssuePriority = 'low' | 'medium' | 'high' | 'critical';

export type IssueCategory = 
  | 'pothole'
  | 'garbage'
  | 'streetlight'
  | 'water_leak'
  | 'drainage'
  | 'road_damage'
  | 'graffiti'
  | 'other';

export interface IssueLocation {
  lat: number;
  lng: number;
  address?: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  location: IssueLocation;
  images: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
  };
  assignedTo?: string;
  upvotes: number;
  comments: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'admin';
  avatar?: string;
}

export const CATEGORY_INFO: Record<IssueCategory, { label: string; icon: string; color: string }> = {
  pothole: { label: 'Pothole', icon: '🕳️', color: 'bg-orange-500' },
  garbage: { label: 'Garbage', icon: '🗑️', color: 'bg-green-600' },
  streetlight: { label: 'Street Light', icon: '💡', color: 'bg-yellow-500' },
  water_leak: { label: 'Water Leak', icon: '💧', color: 'bg-blue-500' },
  drainage: { label: 'Drainage', icon: '🚰', color: 'bg-cyan-600' },
  road_damage: { label: 'Road Damage', icon: '🛣️', color: 'bg-gray-600' },
  graffiti: { label: 'Graffiti', icon: '🎨', color: 'bg-purple-500' },
  other: { label: 'Other', icon: '📋', color: 'bg-slate-500' },
};

export const STATUS_INFO: Record<IssueStatus, { label: string; variant: 'pending' | 'progress' | 'resolved' }> = {
  pending: { label: 'Pending', variant: 'pending' },
  in_progress: { label: 'In Progress', variant: 'progress' },
  resolved: { label: 'Resolved', variant: 'resolved' },
};

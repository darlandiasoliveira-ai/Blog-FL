export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: any;
}

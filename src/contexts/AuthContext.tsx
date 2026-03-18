import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, googleProvider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAdmin: false,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Check if user profile exists in Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setProfile({ id: userSnap.id, ...userSnap.data() } as UserProfile);
        } else {
          // Create new user profile
          const newProfile = {
            name: currentUser.displayName || 'User',
            email: currentUser.email || '',
            role: 'user', // Default role
            createdAt: serverTimestamp(),
          };
          
          try {
            await setDoc(userRef, newProfile);
            setProfile({ id: currentUser.uid, ...newProfile } as UserProfile);
          } catch (error) {
            console.error("Error creating user profile:", error);
          }
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  // The first user (darlandiasoliveira@gmail.com) is automatically an admin via Firestore rules,
  // but we also check the role field for UI purposes.
  const isAdmin = profile?.role === 'admin' || user?.email === 'darlandiasoliveira@gmail.com';

  return (
    <AuthContext.Provider value={{ user, profile, isAdmin, loading, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

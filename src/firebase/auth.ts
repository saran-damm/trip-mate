import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import type { User as FirebaseUser, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from './config';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  profile_image?: File;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  user_id: string;
  email: string;
  name: string;
  profile_image?: string;
}

// Convert Firebase user to our User type
const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => {
  return {
    user_id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || '',
    profile_image: firebaseUser.photoURL || undefined,
  };
};

// Register a new user
export const registerUser = async (userData: RegisterData): Promise<{ user: User; token: string }> => {
  try {
    // Create user with email and password
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    
    const firebaseUser = userCredential.user;
    let photoURL = undefined;
    
    // Upload profile image if provided
    if (userData.profile_image) {
      const storageRef = ref(storage, `profile_images/${firebaseUser.uid}`);
      await uploadBytes(storageRef, userData.profile_image);
      photoURL = await getDownloadURL(storageRef);
    }
    
    // Update user profile with name and photo URL
    await updateProfile(firebaseUser, {
      displayName: userData.name,
      photoURL: photoURL,
    });
    
    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', firebaseUser.uid), {
      name: userData.name,
      email: userData.email,
      profile_image: photoURL,
      created_at: new Date(),
    });
    
    // Get ID token
    const token = await firebaseUser.getIdToken();
    
    // Return user data and token
    return {
      user: mapFirebaseUserToUser(firebaseUser),
      token,
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();
    
    return {
      user: mapFirebaseUserToUser(firebaseUser),
      token,
    };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = async (): Promise<{ success: boolean }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<{ success: boolean }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  const firebaseUser = auth.currentUser;
  if (!firebaseUser) return null;
  
  return mapFirebaseUserToUser(firebaseUser);
};

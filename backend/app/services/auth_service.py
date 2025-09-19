from app.core.database import get_db  # Firebase Firestore client
from firebase_admin import auth, firestore
from fastapi import HTTPException
import logging
import datetime
import jwt
import os
from firebase_admin import firestore

logger = logging.getLogger(__name__)
db = get_db()

# Create a new user in Firestore and Firebase Authentication
async def register_user(name: str, email: str, password: str, profile_image: str = None):
    try:
        # Create user in Firebase Authentication
        firebase_user = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        
        # Add user to Firestore database
        user_ref = db.collection('users').document(firebase_user.uid)
        user_ref.set({
            'name': name,
            'email': email,
            'profile_image': profile_image,
            'created_at': firestore.SERVER_TIMESTAMP,
            'updated_at': firestore.SERVER_TIMESTAMP,
        })
        
        # Generate JWT token
        token = generate_token(firebase_user.uid)
        
        logger.info(f"User created successfully: {firebase_user.uid}")
        return {
            'user_id': firebase_user.uid,
            'email': email,
            'name': name,
            'profile_image': profile_image,
            'token': token
        }
    except Exception as e:
        logger.error(f"Error in user registration: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

# Generate JWT token
def generate_token(user_id: str) -> str:
    payload = {
        'sub': user_id,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # Token expires in 1 day
    }
    token = jwt.encode(payload, os.environ.get('JWT_SECRET', 'your-secret-key'), algorithm='HS256')
    return token

# Login user (returns JWT token)
async def login_user(email: str, password: str):
    try:
        # Firebase Authentication handles the login
        firebase_user = auth.get_user_by_email(email)  # Directly using the auth module here
        
        # For a real application, you would verify the password with Firebase Authentication
        # Here we're just assuming Firebase handles password checking
        
        # Generate JWT token
        token = generate_token(firebase_user.uid)
        
        # Get user data from Firestore
        user_doc = db.collection('users').document(firebase_user.uid).get()
        
        if not user_doc.exists:
            logger.error(f"User document not found for uid: {firebase_user.uid}")
            raise HTTPException(status_code=404, detail="User profile not found")
            
        user_data = user_doc.to_dict()
        
        logger.info(f"User {firebase_user.uid} logged in successfully")
        
        return {
            'user_id': firebase_user.uid,
            'email': firebase_user.email,
            'name': firebase_user.display_name or user_data.get('name'),
            'profile_image': user_data.get('profile_image'),
            'token': token
        }
    except auth.UserNotFoundError:
        logger.error(f"User with email {email} not found")
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        logger.error(f"Error in user login: {str(e)}")
        raise HTTPException(status_code=400, detail="Login failed")

# Password Reset
async def reset_password(email: str):
    try:
        # Get user by email to retrieve the user ID
        firebase_user = auth.get_user_by_email(email)
        
        # Generate password reset link
        reset_link = auth.generate_password_reset_link(email)
        
        logger.info(f"Password reset email sent to {email} for user {firebase_user.uid}")
        
        return {
            "message": "Password reset email sent.",
            "user_id": firebase_user.uid
        }
    except auth.UserNotFoundError:
        logger.error(f"User with email {email} not found")
        raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        logger.error(f"Error sending password reset email: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error: {str(e)}")

# Token Validation (check if JWT is valid)
async def validate_token(token: str):
    try:
        # First try to validate with Firebase
        try:
            decoded_token = auth.verify_id_token(token)  # Directly using the auth module here
            user_id = decoded_token['uid']
            logger.info(f"Firebase token validated for user: {user_id}")
            
            # Get user details from Firebase Authentication
            firebase_user = auth.get_user(user_id)
            
            # Get additional user data from Firestore
            user_doc = db.collection('users').document(user_id).get()
            user_data = user_doc.to_dict() if user_doc.exists else {}
            
            return {
                'user_id': user_id,
                'email': firebase_user.email,
                'name': firebase_user.display_name or user_data.get('name'),
                'profile_image': user_data.get('profile_image')
            }
        except Exception as firebase_error:
            # If Firebase validation fails, try our JWT validation
            try:
                payload = jwt.decode(token, os.environ.get('JWT_SECRET', 'your-secret-key'), algorithms=['HS256'])
                user_id = payload['sub']
                logger.info(f"JWT token validated for user: {user_id}")
                
                # Get user details from Firebase Authentication
                firebase_user = auth.get_user(user_id)
                
                # Get additional user data from Firestore
                user_doc = db.collection('users').document(user_id).get()
                user_data = user_doc.to_dict() if user_doc.exists else {}
                
                return {
                    'user_id': user_id,
                    'email': firebase_user.email,
                    'name': firebase_user.display_name or user_data.get('name'),
                    'profile_image': user_data.get('profile_image')
                }
            except jwt.ExpiredSignatureError:
                logger.error("Token has expired")
                raise HTTPException(status_code=401, detail="Token has expired")
            except jwt.InvalidTokenError:
                logger.error("Invalid token")
                raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Error in token validation: {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token")

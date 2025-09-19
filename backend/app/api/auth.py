from fastapi import APIRouter, HTTPException, File, UploadFile, Form, Depends
from pydantic import BaseModel
from app.services.auth_service import register_user, login_user, reset_password, validate_token
import logging
import json
from google.cloud import storage

router = APIRouter()

logger = logging.getLogger(__name__)

# Request body for user registration with file upload
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

# Request body for login
class LoginRequest(BaseModel):
    email: str
    password: str

# Request body for password reset
class ResetPasswordRequest(BaseModel):
    email: str

# Request body for token validation
class TokenValidationRequest(BaseModel):
    token: str

# Route to register a new user
# Route to register a new user with profile image
@router.post("/register")
async def register(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    profile_image: UploadFile = File(...)
):
    try:
        # Log the received data for debugging
        logger.info(f"Register request received: name={name}, email={email}, profile_image={profile_image.filename}")
        # Upload the image to Firebase or another storage
        image_url = await upload_image_to_storage(profile_image)

        # Create user in Firebase Authentication and Firestore
        user = await register_user(
            name=name,
            email=email,
            password=password,
            profile_image=image_url
        )
        # Return user data and token
        return {
            "message": "User created successfully", 
            "user": {
                "user_id": user["user_id"],
                "email": user["email"],
                "name": user["name"],
                "profile_image": user["profile_image"]
            },
            "token": user["token"]
        }
    except HTTPException as e:
        raise e

# Function to upload profile image to Firebase Storage or another cloud storage
async def upload_image_to_storage(image: UploadFile) -> str:
    try:
        # For development purposes, we'll just return a placeholder URL
        # In a production environment, you would upload to a storage service
        
        # Read the file content to ensure it's a valid image
        contents = await image.read()
        if not contents:
            raise ValueError("Empty file")
            
        # Reset the file pointer for potential future use
        await image.seek(0)
        
        # Return a placeholder URL with the filename
        return f"https://placeholder.com/profile_images/{image.filename}"
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")

# Route to login
@router.post("/login")
async def login(request: LoginRequest):
    try:
        user_data = await login_user(request.email, request.password)
        # Return user data and token
        return {
            "message": "Login successful", 
            "user": {
                "user_id": user_data["user_id"],
                "email": user_data["email"],
                "name": user_data["name"],
                "profile_image": user_data.get("profile_image")
            },
            "token": user_data["token"]
        }
    except HTTPException as e:
        raise e

# Route for password reset
@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    try:
        result = await reset_password(request.email)
        return result
    except HTTPException as e:
        raise e

# Route to validate token
@router.post("/validate-token")
async def validate(request: TokenValidationRequest):
    try:
        user_data = await validate_token(request.token)
        return {
            "message": "Token is valid", 
            "user": user_data
        }
    except HTTPException as e:
        raise e

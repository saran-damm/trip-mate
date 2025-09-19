import firebase_admin
from firebase_admin import credentials, firestore, auth, storage
import logging
import os

# Use absolute path to the admin_secret.json file
cred_path = '/Users/saisarandammavalam/Documents/docs/Code/trip-planner/backend/app/core/admin_secret.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(cred_path)
firebase_admin.initialize_app(cred)

# Get Firestore instance
db = firestore.client()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db():
    return db

# We no longer need get_auth() here, just directly use auth in the service file

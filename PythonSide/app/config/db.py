from pymongo import MongoClient
from core.config import settings

conn = MongoClient(settings.MONGO_DB_URL)
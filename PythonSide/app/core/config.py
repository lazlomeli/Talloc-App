import os 
from dotenv import load_dotenv

env_path = './.env'
load_dotenv(dotenv_path=env_path)

class Settings:
    MONGO_DB_URL:str = os.getenv('MONGO_DB_URL')
    GATEWAY_API_URL:str = os.getenv('GATEWAY_API_URL')
    MONGO_DB_URL_DOCKER:str = os.getenv('MONGO_DB_URL_DOCKER')
    GATEWAY_API_URL_DOCKER:str = os.getenv('GATEWAY_API_URL_DOCKER')

settings = Settings()
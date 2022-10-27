def taskEntity(item) -> dict:
    return {
        "id": item["id"],
        "title": item["title"],
        "programming_language": item["programming_language"],
        "start_date": item["start_date"],
        "end_date": item["end_date"],
        "status": item["status"]
    }

def tasksEntity(entity) -> list:
    [taskEntity(item) for item in entity ]
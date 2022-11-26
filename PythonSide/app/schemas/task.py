def taskEntity(item) -> dict:
    """
    An Item represents a Task
    """
    return {
        "id": str(item["_id"]),
        "title": item["title"],
        "programming_language": item["programming_language"],
        "start_date": item["start_date"],
        "end_date": item["end_date"],
        "status": item["status"]
    }

def tasksEntity(entity) -> list:
    """
    An Entity represents a Task in the list of Tasks
    """
    return [taskEntity(item) for item in entity]
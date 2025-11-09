import asyncio
from functools import wraps
from concurrent.futures import ThreadPoolExecutor

executor = ThreadPoolExecutor()

def async_to_sync(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        loop = asyncio.new_event_loop()
        try:
            return loop.run_until_complete(f(*args, **kwargs))
        finally:
            loop.close()
    return wrapper
import asyncio
import os
import json
import httpx
import uuid


API_BASE_URL = os.environ.get("API_BASE_URL", "http://127.0.0.1:1068")


async def ensure_user_and_character(client: httpx.AsyncClient, username: str, char_name: str):
    # Create user (idempotent-ish; backend returns message if exists)
    r = await client.post(
        f"{API_BASE_URL}/userData",
        json={
            "name": username,
            "username": username,
            "password": "password123!",
        },
        timeout=30.0,
    )
    if r.status_code >= 400:
        print("/userData:", r.status_code, r.text[:200])
        r.raise_for_status()

    # Create character (may fail on duplicate; ignore if already created)
    payload = {
        "username": username,
        "name": char_name,
        "race": "Human",
        "class": "Fighter",
        "subclass": "",
        "str": 12,
        "dex": 12,
        "con": 12,
        "int": 12,
        "wis": 12,
        "cha": 12,
        "backstory": "Test character",
        "icon": 0
    }
    r = await client.post(f"{API_BASE_URL}/characters", json=payload, timeout=30.0)
    if r.status_code >= 400:
        # If duplicate, proceed; otherwise raise
        body = {}
        try:
            body = r.json()
        except Exception:
            pass
        if not ("error" in body and "already exists" in body.get("details", "") or "already exists" in body.get("error", "")):
            print("/characters:", r.status_code, r.text[:200])
            r.raise_for_status()


async def run_flow(client: httpx.AsyncClient, username: str, seed: int, message: str, roll: int = 15):
    print(f"\n=== {username} / seed {seed} ===")

    # Ensure user and a base character exist
    await ensure_user_and_character(client, username, char_name=f"{username}_Hero")

    # Initialize campaign session
    r = await client.post(
        f"{API_BASE_URL}/seed",
        json={"username": username, "seed": seed, "continue_campaign": True},
        timeout=30.0,
    )
    print("/seed:", r.status_code, r.text[:200])
    r.raise_for_status()

    # Fetch DM output for this session
    r = await client.get(
        f"{API_BASE_URL}/DMout",
        params={"username": username, "seed": seed},
        timeout=30.0,
    )
    print("/DMout:", r.status_code)
    dm_data = r.json()
    print("DM:", dm_data.get("dm_text", "").strip()[:120])
    options = dm_data.get("options", [])
    first_option = options[0] if options else None

    # Get roll info (preview)
    r = await client.post(
        f"{API_BASE_URL}/userin",
        json={
            "username": username,
            "seed": seed,
            "step": "get_roll_info",
            "message": first_option or message,
        },
        timeout=30.0,
    )
    print("/userin get_roll_info:", r.status_code)
    print(r.text[:200])

    # Submit outcome
    r = await client.post(
        f"{API_BASE_URL}/userin",
        json={
            "username": username,
            "seed": seed,
            "step": "get_outcome",
            "message": first_option or message,
            "roll": roll,
        },
        timeout=30.0,
    )
    print("/userin get_outcome:", r.status_code)
    print(r.text[:200])


async def main():
    async with httpx.AsyncClient() as client:
        # Simulate two users in two campaigns
        suffix = uuid.uuid4().hex[:6]
        await asyncio.gather(
            run_flow(client, f"UserA_{suffix}", 1, "Option 1"),
            run_flow(client, f"UserB_{suffix}", 2, "Option 1"),
        )


if __name__ == "__main__":
    asyncio.run(main())

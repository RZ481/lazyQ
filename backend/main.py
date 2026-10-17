
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
import sqlite3

app = FastAPI(title="LazyQ API")

# Database file inside the backend folder
DB_PATH = Path(__file__).parent / "lazyq.db"


# Connect to SQLite
def get_connection():
    connection = sqlite3.connect(DB_PATH, timeout=10)
    connection.row_factory = sqlite3.Row
    return connection


# Create the database table when the app starts
def initialize_database():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'waiting'
            )
        """)


initialize_database()


# Customer information
class Customer(BaseModel):
    name: str


# Homepage
@app.get("/")
def home():
    return {"message": "LazyQ backend is running!"}


# Join the queue
@app.post("/queue/join")
def join_queue(customer: Customer):
    if not customer.name.strip():
        raise HTTPException(400, "Name cannot be empty")

    with get_connection() as conn:
        cursor = conn.execute(
            "INSERT INTO tickets (name, status) VALUES (?, ?)",
            (customer.name.strip(), "waiting")
        )
        ticket_number = cursor.lastrowid

        people_ahead = conn.execute(
            "SELECT COUNT(*) FROM tickets WHERE status = 'waiting' AND id < ?",
            (ticket_number,)
        ).fetchone()[0]

    return {
        "message": "Joined successfully!",
        "ticket": ticket_number,
        "people_ahead": people_ahead
    }


# View the queue
@app.get("/queue")
def get_queue():
    with get_connection() as conn:
        waiting = conn.execute(
            "SELECT id, name FROM tickets WHERE status = 'waiting' ORDER BY id"
        ).fetchall()

        serving = conn.execute(
            "SELECT id, name FROM tickets WHERE status = 'serving' ORDER BY id DESC LIMIT 1"
        ).fetchone()

    return {
        "currently_serving": dict(serving) if serving else None,
        "waiting": [dict(ticket) for ticket in waiting],
        "total_waiting": len(waiting)
    }


# Check a ticket's status
@app.get("/queue/status/{ticket_number}")
def check_position(ticket_number: int):
    with get_connection() as conn:
        ticket = conn.execute(
            "SELECT id, status FROM tickets WHERE id = ?",
            (ticket_number,)
        ).fetchone()

        if ticket is None:
            raise HTTPException(404, "Ticket not found")

        if ticket["status"] == "waiting":
            people_ahead = conn.execute(
                "SELECT COUNT(*) FROM tickets WHERE status = 'waiting' AND id < ?",
                (ticket_number,)
            ).fetchone()[0]
        else:
            people_ahead = 0

    return {
        "ticket": ticket_number,
        "status": ticket["status"],
        "people_ahead": people_ahead
    }


# Staff calls the next customer
@app.post("/queue/next")
def call_next():
    with get_connection() as conn:
        conn.execute(
            "UPDATE tickets SET status = 'completed' WHERE status = 'serving'"
        )

        next_customer = conn.execute(
            "SELECT id, name FROM tickets WHERE status = 'waiting' ORDER BY id LIMIT 1"
        ).fetchone()

        if next_customer is None:
            return {"message": "Queue is empty"}

        conn.execute(
            "UPDATE tickets SET status = 'serving' WHERE id = ?",
            (next_customer["id"],)
        )

    return {
        "message": "Next customer called!",
        "now_serving": next_customer["id"],
        "customer": next_customer["name"]
    }

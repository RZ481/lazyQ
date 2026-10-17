
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from threading import Lock

# Create our backend application
app = FastAPI(title="LazyQ API")

# Temporary queue data
queue = []
next_ticket = 1
currently_serving = None
lock = Lock()


# Define the information a customer sends
class Customer(BaseModel):
    name: str


# Check if our backend works
@app.get("/")
def home():
    return {"message": "Welcome to LazyQ!"}


# Customer joins the queue
@app.post("/queue/join")
def join_queue(customer: Customer):
    global next_ticket

    with lock:
        ticket = {
            "number": next_ticket,
            "name": customer.name
        }

        queue.append(ticket)
        next_ticket += 1

        return {
            "message": "Successfully joined!",
            "ticket": ticket["number"],
            "people_ahead": len(queue) - 1
        }


# View the entire queue
@app.get("/queue")
def get_queue():
    with lock:
        return {
            "currently_serving": currently_serving,
            "waiting": queue.copy(),
            "total_waiting": len(queue)
        }


# Customer checks their position
@app.get("/queue/status/{ticket_number}")
def check_position(ticket_number: int):
    with lock:
        if ticket_number == currently_serving:
            return {
                "status": "your_turn",
                "people_ahead": 0
            }

        for index, customer in enumerate(queue):
            if customer["number"] == ticket_number:
                return {
                    "status": "waiting",
                    "people_ahead": index
                }

        raise HTTPException(
            status_code=404,
            detail="Ticket not found"
        )


# Staff calls the next customer
@app.post("/queue/next")
def call_next():
    global currently_serving

    with lock:
        if not queue:
            return {"message": "Queue is empty"}

        customer = queue.pop(0)
        currently_serving = customer["number"]

        return {
            "message": "Next customer called!",
            "now_serving": currently_serving,
            "customer": customer["name"]
        }

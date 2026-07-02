import os
from flask import Flask, request
from flask_cors import CORS
from supabase import create_client, Client
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
CORS(app)

# os can be used to access environment variables, such as the Supabase URL and key
#dotenv is used to load environment variables from a .env file into the environment
#os is used to access those variables in the code.
supabase = Client = create_client(
    supabase_url=os.getenv("SUPABASE_URL"),
    supabase_key=os.getenv("SUPABASE_KEY")
)

@app.get("/api/health")
def health():
    return {"message": "Online"}

#read
@app.get("/api/tools")
def get_tools():
    tools = supabase.from_("makerspace_tools").select("*").execute()
    return {"tools": tools.data}, 200

#create
@app.post("/api/tools")
def create_tool():
    data = request.get_json() #convert body to json
    if not data or 'tool_name' not in data or 'category' not in data or 'daily_rental_rate' not in data:
        return {"error": "Missing required fields"}, 400 # bad request
    payload = {
        "tool_name": data["tool_name"],
        "category": data["category"],
        "daily_rental_rate": data["daily_rental_rate"]
    }
    tool = supabase.from_("makerspace_tools").insert(payload).execute()
    return {"message": f"Tool '{data['tool_name']}' added.", "tool": tool.data}, 201 # created

if __name__ == "__main__":
    app.run(debug=True, port=5000)


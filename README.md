# lvl4-w4-d3-makerspace-db

# Workflow: set up virtual environment with py -m venv .venv; install flask, flask-cors, python-dotenv, and supabase with pip install; then pip freeze > requirements.txt 

# layout:    
## app.py - flask & supabase
## frontend/ vite install - user interface


App is a tool inventory database for a maker's space, where tools are available to rent with a daily rate and categories. 
Flask is used to communicate to supabase with url endpoints. 

Run the backend with py app.py
Run the frontend with cd frontend, then npm run dev

There is a healthcheck route "/api/health", and a get and a post route at "/api/tools"


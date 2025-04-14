# ECE 461L Software Engineering Lab
Hardware as a Service (HaaS) checkout system. HAAMI stands for group member names.

## Getting started

### Install dependencies

`npm install`

### Running development server

`npm run dev`

By default, the app will be available at `http://localhost:5173/`

### Build for production

`npm run build`

## Flask server

`cd backend`

### Create Python virtual environment

`python -m venv .venv`

### Activate virtual environment

```bash
# Linux
source venv/bin/activate

# Windows
.venv\bin\Activate.ps1
```

### Install dependencies

`pip install -r requirements.txt`

### Start Flask server

`flask run`

By default, the flask app will be available at `http://localhost:5000/`

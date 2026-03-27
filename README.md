# HireFlow

HireFlow is a comprehensive job application platform that connects employers with job seekers. It provides a seamless experience for posting jobs, applying to positions, managing applications, and handling subscriptions and notifications.

## Features

- **User Management**: Registration and authentication for both employers and job seekers
- **Job Posting**: Employers can create and manage job listings
- **Application System**: Job seekers can apply to jobs with their resumes
- **Subscription Management**: Different subscription tiers for employers
- **Notifications**: Real-time notifications for application updates
- **Admin Dashboard**: Django admin interface for system management

## Tech Stack

### Backend

- **Django 6.0.3**: Web framework
- **Django REST Framework**: API development
- **PostgreSQL/SQLite**: Database (configurable)
- **JWT Authentication**: Secure token-based authentication
- **Celery + Redis**: Background task processing
- **Channels**: WebSocket support for real-time features

### Frontend

- **React 19**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **Recharts**: Data visualization

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- PostgreSQL (optional, SQLite used by default in development)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hireflow
```

### 2. Backend Setup

#### Create Virtual Environment

```bash
cd backend
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Environment Configuration

Create a `.env` file in the `backend` directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3  # or PostgreSQL URL
```

Generate a secret key:

```bash
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

#### Database Setup

```bash
python manage.py migrate
```

#### Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

#### Run Backend Server

```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../frontend
npm install
```

#### Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 4. Additional Services (Optional)

#### Redis Setup (for Celery)

Install Redis and start the service:

```bash
# On Windows (using Redis for Windows)
redis-server

# On macOS (using Homebrew)
brew install redis
brew services start redis

# On Linux
sudo apt install redis-server
sudo systemctl start redis
```

#### Celery Worker

```bash
cd backend
celery -A config worker -l info
```

## API Documentation

The API endpoints are available at `http://localhost:8000/api/`

Key endpoints:

- `/api/users/`: User management
- `/api/jobs/`: Job listings
- `/api/applications/`: Job applications
- `/api/employers/`: Employer profiles
- `/api/subscriptions/`: Subscription management
- `/api/notifications/`: Notification system

## Development

### Running Tests

```bash
cd backend
python manage.py test
```

### Linting

```bash
cd frontend
npm run lint
```

### Building for Production

```bash
cd frontend
npm run build
```

## Deployment

### Backend

1. Set `DEBUG=False` in production settings
2. Configure PostgreSQL database
3. Set up proper SECRET_KEY
4. Configure static files serving
5. Set up Celery with a message broker (Redis/RabbitMQ)

### Frontend

1. Build the production bundle: `npm run build`
2. Serve the `dist` folder using a web server (nginx, Apache, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

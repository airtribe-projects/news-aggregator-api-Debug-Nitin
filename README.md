[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16470558&assignment_repo_type=AssignmentRepo)

# News Aggregator API

## Project Overview
The News Aggregator API is designed to collect and serve news articles from various sources. It provides endpoints to fetch the latest news, search for articles, and filter news based on categories.

## Installation Instructions
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/news-aggregator-api.git
    ```
2. Navigate to the project directory:
    ```bash
    cd news-aggregator-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables by creating a `.env` file:
    ```env
    PORT=3000
    DATABASE_URL=your_database_url
    API_KEY=your_api_key
    ```
5. Start the server:
    ```bash
    npm start
    ```

## API Endpoint Documentation

### User Register
- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
    ```json
    {
        "username": "newuser",
        "email": "newuser@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "id": "1",
        "username": "newuser",
        "email": "newuser@example.com",
        "createdAt": "2023-10-01T12:00:00Z"
    }
    ```

### User Login
- **URL:** `/users/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a token.
- **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "securepassword"
    }
    ```
- **Response:**
    ```json
    {
        "token": "your_jwt_token"
    }
    ```

### User Preferences
- **URL:** `/users/preferences`
- **Method:** `GET`
- **Description:** Retrieves the preferences of the authenticated user.
- **Response:**
    ```json
    {
        "id": "1",
        "username": "user",
        "preferences": ["technology", "health"]
    }
    ```


    ### Update User Preferences
    - **URL:** `/users/preferences`
    - **Method:** `PUT`
    - **Description:** Updates the preferences of the authenticated user.
    - **Request Body:**
        ```json
        {
            "preferences": ["technology", "health"]
        }
        ```
    - **Response:**
        ```json
        {
            "id": "1",
            "username": "user",
            "preferences": ["technology", "health"],
            "updatedAt": "2023-10-01T12:30:00Z"
        }
        ```

### Get News
    - **URL:** `/users/news`
    - **Method:** `GET`
    - **Description:** Fetches the latest news articles.
    - **Query Parameters:**
    - `category` (optional): Filter news by category (e.g., `technology`, `health`).
    - `search` (optional): Search for news articles containing specific keywords.
    - **Response:**
        ```json
        [
        {
          "id": "1",
          "title": "Latest Tech News",
          "content": "This is the latest in technology...",
          "category": "technology",
          "publishedAt": "2023-10-01T10:00:00Z",
          "source": "TechCrunch"
        },
        {
            "id": "2",
            "title": "Health Update",
            "content": "Recent advancements in health...",
            "category": "health",
            "publishedAt": "2023-10-01T11:00:00Z",
            "source": "HealthLine"
            }
        ]
    ```


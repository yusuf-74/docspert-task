# Account Transfer Web App

This project is a small web application built using Django and Django REST Framework (DRF) to handle fund transfers between accounts. It supports importing a list of accounts with opening balances, querying these accounts, and transferring funds between any two accounts.

## Features

- **Account Management**: Import a list of accounts with opening balances.
- **Fund Transfers**: Transfer funds between any two accounts.
- **Account Querying**: Query accounts to view details and transaction history.
- **Pagination**: Efficiently navigate through account lists and transactions.
- **Nested Data Retrieval**: Use of flexible serializers for retrieving nested objects like accounts and their transactions.
- **API Documentation**: Interactive API documentation with Swagger.

## Tech Stack

- **Backend**: Django, Django REST Framework (DRF)
- **Testing**: Pytest
- **Code Quality**: Isort, Black, Flake8, Pre-commit
- **Containerization**: Docker Compose

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yusuf-74/docspert-task.git
   cd docspert-task
   ```

2. **Build and run the Docker containers**:

   ```bash
   docker-compose up --build
   ```

3. **Import account data**:

   You can import a list of accounts with opening balances using the provided API endpoint.
   Or you can use the react frontend to import the accounts.

## Usage

1. **Access the application**:

   The application will be accessible at `http://localhost`.

2. **Swagger API Documentation**:

   Visit `http://localhost/api/docs/` to explore the API documentation.

3. **Perform Account Operations**:

   - Import accounts
   - Query account details
   - Transfer funds between accounts

## Testing

Run unit tests using Pytest to ensure functionality and coverage of normal and edge cases:

```bash
docker-compose exec api pytest
```

## Code Quality

Ensure code quality and consistency with:

- **Isort**: Sort imports
- **Black**: Format code
- **Flake8**: Lint code
- **Pre-commit**: Run checks before committing

Install pre-commit hooks:

```bash
pre-commit install
```

## Acknowledgements

- Django
- Django REST Framework
- Docker
- Pytest
- Isort, Black, Flake8
- Swagger

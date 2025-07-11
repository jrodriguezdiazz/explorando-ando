# ExplorandoAndo

A personalized travel recommendation platform that helps users discover destinations based on their preferences and interests.

| Photo 1   | Photo 2 |
| ------- | ------- |
| <img width="587" height="601" alt="Screenshot 2025-07-10 at 23 29 00" src="https://github.com/user-attachments/assets/8cb2bf03-91d7-4f61-80ca-e590e64bf28a" /> | <img width="696" height="611" alt="Screenshot 2025-07-10 at 23 29 12" src="https://github.com/user-attachments/assets/1b8ca58b-002e-4d87-aec4-b1574ee1b0a9" /> |

## 🌟 Overview

ExplorandoAndo is a comprehensive travel recommendation system that analyzes user data, preferences, and reviews to provide personalized destination suggestions. The platform combines intelligent algorithms with user-friendly interfaces to deliver tailored travel experiences.

## 🎯 Key Features

### User Profile Management
- User registration and authentication
- Profile creation and updates
- Personal preferences and interests collection

### Personalized Recommendations
- Data analysis and user preference processing
- Review and opinion database processing
- Intelligent matching algorithm for destination selection

### System Administration
- User and destination database management
- Platform monitoring and maintenance
- Content and system functionality updates

## 🛠️ Technology Stack

### Programming Language
- **JavaScript** - Versatile language for both client and server-side development

### Database
- **PostgreSQL** - Robust, reliable relational database with JSON support

### Containerization
- **Client**: Web Application
- **Backend**: Node.js
- **Database**: PostgreSQL

### Application Server
- **Express.js** - Minimalist web framework for Node.js

### Frontend Framework
- **React** - Component-based UI library for dynamic user interfaces

- Modular, reusable components
- Automated testing implementation
- Code review processes

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/explorandoando.git
cd explorandoando
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
# Create PostgreSQL database
createdb explorandoando

# Run migrations
npm run migrate
```

4. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Start the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📚 API Documentation

The API documentation is available via Swagger UI at `/api-docs` when the server is running.

### Key Endpoints
- `GET /api/users/profile` - Get user profile
- `POST /api/recommendations` - Get personalized recommendations
- `GET /api/destinations` - Browse destinations
- `POST /api/auth/login` - User authentication

## 🧪 Testing

Run the test suite:
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# End-to-end tests
npm run test:e2e
```


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🐛 Bug Reports

If you encounter any bugs, please create an issue in the [GitHub repository](https://github.com/jrodriguezdiazz/explorando-ando/issues).

## 📞 Support

For support and questions, please contact our team or create an issue in the repository.

---

**ExplorandoAndo** - Discover your next adventure with personalized travel recommendations! 🌍✈️

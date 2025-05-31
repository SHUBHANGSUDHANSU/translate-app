# Translation App

A Vue.js application that allows users to translate text between different languages using the Google Translate API.

## Features

- Translate text between multiple languages
- View translation history (last 10 translations)
- Clean and modern user interface
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Google Cloud Platform account with Translation API enabled

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd translate-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your Google Translate API key to the `.env` file:
```
VUE_APP_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
VUE_APP_GOOGLE_TRANSLATE_API_URL=https://translation.googleapis.com/language/translate/v2
```

## Development

To start the development server:
```bash
npm run serve
```

The app will be available at `http://localhost:8080`

## Building for Production

To build the app for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- Vue.js 3
- Axios for API requests
- Google Cloud Translation API
- Modern CSS with Flexbox and Grid

## License

MIT 
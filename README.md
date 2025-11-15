# 🌟 Star Wars Character App

A responsive React application that displays Star Wars characters using the SWAPI (Star Wars API).

## 🚀 Features

### Core Features
- ✅ **Character List**: Fetch and display Star Wars characters from SWAPI
- ✅ **Pagination**: Navigate through paginated character data
- ✅ **Loading & Error States**: Graceful handling of API states
- ✅ **Character Cards**: Display character name with random images and species-based colors
- ✅ **Character Details Modal**: View detailed information including:
  - Name, Height, Mass, Birth Year
  - Number of films
  - Homeworld details (name, terrain, climate, population)
  - Formatted date added (dd-MM-yyyy)
- ✅ **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Bonus Features
- ✅ **Search**: Search characters by name (partial match)
- ✅ **Filters**: Filter by homeworld and species
- ✅ **Combined Search + Filter**: Use search and filters together
- ✅ **Mock Authentication**: 
  - Login/logout with fake credentials
  - Mocked JWT token with silent refresh logic
- ✅ **Integration Testing**: Test for modal opening with correct character details

## 🧰 Tech Stack

- **React** (with hooks and functional components)
- **JavaScript** (ES6+)
- **Tailwind CSS** (for styling)
- **Vite** (build tool)
- **Vitest** (testing framework)
- **React Testing Library** (component testing)
- **SWAPI** (Star Wars API)

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build



## 🔐 Mock Authentication

The app includes a mock authentication system:

**Default Credentials:**
- Username: `admin`
- Password: `password`

Or use any of these:
- `user` / `pass123`
- `demo` / `demo123`

The authentication includes:
- JWT token generation (mocked)
- Token storage in localStorage
- Silent token refresh every 14 minutes
- Automatic logout on token expiration

## 🎨 Features Breakdown

### 1. Character Cards
- Random images from Picsum Photos
- Species-based background colors
- Hover effects and animations
- Click to view details

### 2. Character Modal
- Displays comprehensive character information
- Fetches homeworld details dynamically
- Formatted dates and measurements
- Smooth animations
- Click outside or ESC key to close

### 3. Search & Filters
- Real-time search by character name
- Filter by homeworld
- Filter by species
- Clear all filters button
- Filters work in combination with search

### 4. Pagination
- Navigate between pages
- Shows current page and total pages
- Disabled states for first/last pages
- Smooth page transitions

### 5. Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Grid layout adapts to screen size
- Touch-friendly interface

## 🧪 Testing

The project includes integration tests for the character modal:

```bash
npm test
```

Test coverage includes:
- Modal opening on character card click
- Correct character details displayed
- Homeworld information fetching

## 📁 Project Structure

```
star-wars-app/
├── src/
│   ├── components/
│   │   ├── CharacterCard.jsx      # Character card component
│   │   ├── CharacterModal.jsx     # Modal for character details
│   │   ├── Filters.jsx            # Filter controls
│   │   ├── Login.jsx              # Login form
│   │   ├── Pagination.jsx         # Pagination controls
│   │   └── SearchBar.jsx          # Search input
│   ├── hooks/
│   │   └── useCharacters.js       # Custom hook for fetching characters
│   ├── utils/
│   │   ├── auth.js                # Authentication utilities
│   │   ├── colors.js              # Species color mapping
│   │   └── format.js              # Date formatting utilities
│   ├── test/
│   │   ├── setup.js               # Test setup
│   │   └── CharacterModal.test.jsx # Integration tests
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles with Tailwind
├── public/                        # Static assets
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── vitest.config.js               # Vitest configuration
├── tailwind.config.js             # Tailwind configuration
└── package.json                   # Dependencies and scripts
```

## 🎯 Development Guidelines Followed

- ✅ React functional components and hooks
- ✅ Small, modular, and reusable components
- ✅ Clear prop types with JSDoc comments
- ✅ Clean folder structure
- ✅ Meaningful variable names
- ✅ Graceful handling of loading, empty, and error states
- ✅ Responsive design with Tailwind CSS
- ✅ Integration testing with React Testing Library

## 🌐 API Reference

This app uses the [SWAPI (Star Wars API)](https://swapi.dev/):
- `/api/people/` - Get characters
- `/api/planets/` - Get planet details
- `/api/species/` - Get species details

## 🎨 Design Features

- Animated starfield background
- Gradient color schemes
- Smooth transitions and hover effects
- Star Wars themed UI
- Accessible and user-friendly interface

## 📝 License

This project is created as a take-home assignment.

---

**May the Force be with you!** ⭐

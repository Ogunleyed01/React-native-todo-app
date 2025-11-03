# Todo App - React Native with Convex

A sophisticated Todo List application built with React Native (Expo), featuring real-time backend integration with Convex, light/dark theme switching, and pixel-perfect design matching the Figma specifications.

## Features

- **CRUD Operations** - Create, read, update, and delete todos with real-time synchronization
- **Theme Switching** - Toggle between light and dark themes with persistent preferences
- **Filter Todos** - Filter by All, Active, or Completed todos
- **Drag & Drop** - Reorder todos by dragging and dropping
- **Real-time Updates** - All changes sync instantly across devices using Convex
- **Empty States** - Beautiful empty states and loading indicators
- **Accessibility** - Screen reader support and proper contrast ratios
- **Responsive Design** - Works beautifully on all screen sizes

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- An Expo account
- A Convex account ([sign up here](https://www.convex.dev/))

## Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd todoapp-react-native
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up Convex**

   ```bash
   npx convex dev
   ```

   This will prompt you to:
   - Log in with your GitHub account
   - Create a new Convex project
   - Get your Convex URL

4. **Configure environment variables**

   Create a `.env.local` file in the root directory (if it doesn't exist):

   ```bash
   EXPO_PUBLIC_CONVEX_URL=your_convex_url_here
   ```

   **For Cloud Deployment (Recommended):**
   - Get your deployment URL from the Convex dev terminal (looks like `https://your-project.convex.cloud`)
   - Use that URL in `.env.local`

   **For Local Development with Expo Go:**
   - **Android Emulator**: Use `http://10.0.2.2:3210`
   - **iOS Simulator**: Use `http://127.0.0.1:3210`
   - **Physical Device (Expo Go)**: Use your computer's local IP (e.g., `http://10.52.92.112:3210`)
     - Find your IP: Windows `ipconfig`, Mac/Linux `ifconfig`
     - Make sure your phone and computer are on the same Wi-Fi network

## Technology Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - React Native toolchain
- **Expo Router** - File-based routing
- **Convex** - Backend-as-a-Service for real-time sync
- **NativeWind** - Tailwind CSS for React Native
- **Expo Linear Gradient** - Gradients in React Native
- **Expo Secure Store** - Secure storage for theme preferences
- **React Native Draggable FlatList** - Drag and drop functionality
- **TypeScript** - Type safety

## Convex Setup

This app uses Convex for real-time backend operations. The Convex configuration includes:

1. **Schema** (`convex/schema.ts`) - Defines the todos table structure
2. **Functions** (`convex/todos.ts`) - Contains queries and mutations for:
   - `getAll` - Fetch all todos
   - `create` - Add a new todo
   - `update` - Update a todo
   - `remove` - Delete a todo
   - `clearCompleted` - Delete all completed todos
   - `reorder` - Update todo order

## Usage

1. **Add a Todo**: Type in the input field and press Enter
2. **Complete a Todo**: Tap the checkbox on the left
3. **Delete a Todo**: Tap the X button on the right
4. **Filter Todos**: Use the All/Active/Completed buttons in the footer
5. **Reorder Todos**: Long press and drag a todo to reorder
6. **Clear Completed**: Tap "Clear Completed" in the footer
7. **Toggle Theme**: Tap the sun/moon icon in the header

## Accessibility

The app includes:
- Proper semantic labels for screen readers
- High contrast ratios for text
- Touch targets sized appropriately (minimum 44x44 points)
- Logical tab order
- Descriptive accessibiliy labels on interactive elements

## Performance

- Optimized rendering with React.memo where appropriate
- Efficient state management with Convex real-time subscriptions
- Debounced mutations to prevent excessive API calls
- Lazy loading and virtualization for large lists

## Known Issues

- Drag and drop doesn't work when filtering (only shows filtered items)
- Convex configuration requires manual generation of types

## Future Improvements

- Search functionality
- Due dates and reminders
- Categories/tags for todos
- Sharing and collaboration
- Offline mode with sync
- Biometric authentication
- Skeleton loading states

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Figma Design](https://www.figma.com/design/NRbd5hcrQcAa1LBbctUhf9/todo-app?node-id=0-1&p=f&m=dev) for the beautiful design
- [Convex](https://www.convex.dev/) for the amazing backend platform
- [Expo](https://expo.dev/) for the incredible tooling
- [React Native](https://reactnative.dev/) for making cross-platform development a joy

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Demo

[Video demonstration](https://drive.google.com/file/d/your-video-id/view) showcasing all features.

APK download available upon request.

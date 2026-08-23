# App Start Demo

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm run start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Heavy module loading strategy

Use the switch on the Home screen to choose the Heavy module loading strategy:

- `'eager'` evaluates the Heavy module during app startup.
- `'lazy'` evaluates it only when the Heavy tab opens.

The preference is persisted with MMKV and defaults to `'eager'`. It applies the next time the app starts, because the navigator chooses its import path while the JavaScript bundle is evaluating. Use a full reload or relaunch when demonstrating the change; Fast Refresh can preserve or re-evaluate modules inconsistently.

After each change, cold-restart the app. In lazy mode, stay on Home first, then open Heavy and watch the loading state and console logs. The Heavy screen copy shows the active strategy.

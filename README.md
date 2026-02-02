# Classic Snake Game

A minimal implementation of the classic Snake game using vanilla JavaScript, HTML, and CSS.

## How to Run

Since this project has zero dependencies, you can open `index.html` directly in your browser, or serve it using Python (recommended for better module support).

### Using Python (Recommended)

1. Open your terminal in this directory:
   ```bash
   cd snakegame
   ```

2. Start a simple HTTP server:
   ```bash
   python3 -m http.server
   ```

3. Open your browser to: [http://localhost:8000](http://localhost:8000)

### Controls

- **Arrow Keys** or **WASD**: Move the snake.
- **Spacebar**: Restart game (when Game Over).

## Features

- Classic snake movement and growth.
- Score tracking.
- increasing speed (currently fixed speed, can be modified in `main.js`).
- Wall wrapping (currently walls kill you).
- Dark mode UI.

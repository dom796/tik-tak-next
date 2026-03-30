# Tic-Tac-Toe Online

Real-time multiplayer Tic-Tac-Toe. Players create lobbies, join games, and play against each other with live board synchronization via SSE and RabbitMQ.

## Stack

- **Next.js 15** (App Router, Server Actions, Server Components)
- **PostgreSQL** + **Prisma 5** — data layer
- **RabbitMQ** — event broadcasting between clients
- **SSE (Server-Sent Events)** — real-time game and lobby updates
- **JWT** (jose) — session management via HTTP-only cookies
- **Tailwind CSS** + **Radix UI** — UI components
- **Zod** — schema validation
- **Docker Compose** — local infrastructure

## Architecture

Feature-Sliced Design structure:

```
src/
├── app/
│   ├── (auth)/         # sign-in, sign-up
│   └── (private)/      # games list, game board + SSE stream
├── entities/
│   ├── game/           # domain logic (doStep, calculateWinner), repositories, services
│   └── user/           # auth, session, user services
├── features/
│   ├── auth/           # server actions, form containers
│   ├── game/           # game board, useGame hook, step action
│   └── games-list/     # lobby listing, create game action, SSE route
├── shared/
│   ├── lib/            # SSE helpers, Either monad, password hashing
│   └── ui/             # shared Radix UI components
└── kernel/             # ID types, route helpers
```

**Key design decisions:**
- Game logic is pure functions isolated in `domain.ts` — no side effects, easy to test
- `Either<Error, T>` monad for error handling instead of exceptions in the domain layer
- SSE streams scoped per game and per lobby — each client subscribes to its own channel
- RabbitMQ decouples SSE delivery from request handling

## Local Setup

**Prerequisites:** Docker, Node.js 18+

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL and RabbitMQ
docker compose up -d

# 3. Copy environment variables
cp .env.development .env

# 4. Run migrations
npx prisma migrate dev

# 5. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

```prisma
model User {
  id           String       // cuid
  login        String       // unique
  passwordHash String
  salt         String
  rating       Int
  gamePlayers  GamePlayer[]
}

model Game {
  id          String       // cuid
  status      GameStatus   // idle | inProgress | gameOver | gameOverDraw
  field       Json         // (String | null)[] — X/O/null per cell
  players     GamePlayer[]
  winner      GamePlayer?
}

model GamePlayer {
  index  Int    // 0 = X, 1 = O
  user   User
  game   Game
}
```

## How It Works

1. Authenticated user creates a game → status `idle`, appears in the lobby stream
2. Another user joins → status becomes `inProgress`, both clients subscribe to game SSE stream
3. Each move triggers a Server Action → updates DB → publishes event to RabbitMQ → SSE pushes updated state to both clients
4. Win/draw detection runs after each move using hardcoded line combinations
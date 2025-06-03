# @beekeeperstudio/plugin

A TypeScript wrapper library for building Beekeeper Studio plugins that enables communication between your plugin and the main application.

## Installation

```bash
npm install github:beekeeper-studio/plugin
# or
yarn add github:beekeeper-studio/plugin
```

## Quick Start

```typescript
import { request, notify } from '@beekeeperstudio/plugin';

// Get all tables in the current database
const tables = await request('getTables');

// Run a SQL query
const result = await request('runQuery', { query: 'SELECT * FROM users LIMIT 10' });
```

## Development

```bash
# Build the library
npm run build

# Prepare for publishing
npm run prepublishOnly
```

## License

MIT - see [LICENSE](LICENSE) file for details.


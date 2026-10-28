# Beekeeper Studio Plugin SDK

The official TypeScript SDK for building [Beekeeper Studio](https://www.beekeeperstudio.io) plugins.

Plugins are small web apps that run inside Beekeeper Studio in a sandboxed `<iframe>`. The
SDK (`@beekeeperstudio/plugin` on npm) wraps the `postMessage` protocol between your plugin
and the app in typed, promise-based functions, so you can read the connected database, run
queries and integrate with the Beekeeper Studio UI.

## Documentation

- [Plugin Development Introduction](https://docs.beekeeperstudio.io/plugin_development/) - how plugins work
- [Creating Your First Plugin](https://docs.beekeeperstudio.io/plugin_development/creating-your-first-plugin/) - step-by-step tutorial
- [SDK Reference](https://docs.beekeeperstudio.io/plugin_development/api-reference/) - every function, event and type in the SDK
- [Plugin Views](https://docs.beekeeperstudio.io/plugin_development/plugin-views/) - where plugins appear in the UI
- [Manifest Reference](https://docs.beekeeperstudio.io/plugin_development/manifest/) - the `manifest.json` format
- [Publishing Plugins](https://docs.beekeeperstudio.io/plugin_development/publishing-plugins/) - distribute your plugin to other users

## Features

- **Database metadata** - list schemas, tables, columns, primary keys, foreign keys and indexes
  (`getSchemas`, `getTables`, `getColumns`, `getTableKeys`, `getTableIndexes`, ...)
- **Queries** - run SQL against the active connection with `runQuery`, and show results in
  Beekeeper Studio's own result table with `expandTableResult`
- **Connection and app info** - read connection details, the app version, the theme and
  update status (`getConnectionInfo`, `getAppInfo`, `getAppVersion`, `checkForUpdate`)
- **Views and tabs** - read how a view was opened, persist per-view state, set the tab title,
  open query, table data or table structure tabs and control the status bar (`getViewContext`, `getViewState`,
  `setViewState`, `setTabTitle`, `openTab`, `toggleStatusBarUI`, ...)
- **Storage** - persist plugin data, with optional encryption (`appStorage`)
- **App UI** - show toast notifications and confirmation dialogs (`noty`, `confirm`)
- **System integration** - clipboard text and images, native save dialogs and opening links
  in the browser (`clipboard`, `requestFileSave`, `openExternal`)
- **Events** - react to theme changes, table changes and window events with
  `addNotificationListener`, and message other views of your plugin with `broadcast`
- **Keyboard and mouse forwarding** - `@beekeeperstudio/plugin/dist/eventForwarder` passes
  app shortcuts and pointer events from your plugin through to Beekeeper Studio
- **Debugging** - log every message with `setDebugComms`, and write to the app log with `log`
- **TypeScript types** - typed requests, responses and shared models such as `Table`,
  `Column`, `QueryResult` and the context menu params

See the [SDK Reference](https://docs.beekeeperstudio.io/plugin_development/api-reference/)
for the full list.

## Installation

```bash
npm install @beekeeperstudio/plugin
# or
yarn add @beekeeperstudio/plugin
```

## Quick Start

```typescript
// Forwards keyboard and mouse events to Beekeeper Studio
import "@beekeeperstudio/plugin/dist/eventForwarder";
import { getTables, runQuery } from "@beekeeperstudio/plugin";

// Get all tables in the current database
const tables = await getTables();

// Run a SQL query
const result = await runQuery("SELECT * FROM users LIMIT 10");
```

For a complete walkthrough, follow
[Creating Your First Plugin](https://docs.beekeeperstudio.io/plugin_development/creating-your-first-plugin/).

## Building with Vite

Use [`@beekeeperstudio/vite-plugin`](https://github.com/beekeeper-studio/vite-plugin) to build
your plugin with [Vite](https://vite.dev). It adds hot module replacement inside Beekeeper Studio
during development, and rewrites your HTML so the production bundle loads correctly in the app.

```bash
npm install --save-dev @beekeeperstudio/vite-plugin
# or
yarn add -D @beekeeperstudio/vite-plugin
```

## Development

```bash
# Build the library
yarn build

# Generate API docs with TypeDoc
yarn docs
```

## License

MIT

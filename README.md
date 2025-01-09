# Local-only activity tracker app
A new paradigm of building apps is coming to the web: **Local-first**.

One of the key components of a local-first app is having a local data store. In this project template we implement the first step before local-first: **Local-only**.

The project is a Vite app completely on the client. It uses [DexieJS](https://dexie.org/) as local IndexedDB database to make the app work end-to-end on the user device.

> Check out also [calories-tracker-local-only-app](https://github.com/typeonce-dev/calories-tracker-local-only-app) for a local-only app using `@electric-sql/pglite` as local `postgres` database.

> This project also includes a `@electric-sql/pglite` implementation [in a previous release](https://github.com/typeonce-dev/activity-tracker-local-only-app/releases/tag/pglite).
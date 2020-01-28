![SSCx illustration](./doc/sscx.png)

## Development

Install dependencies:

```sh
yarn
```

To start the portal in development mode, run:

```sh
yarn start
```

Lint code:

```sh
yarn lint
```

Check style:

```sh
yarn style
```

Run unit tests:

```sh
yarn test
```

## Build for production

Compile app in `dist/` folder.

```sh
yarn build
```

### ENV variables list at build time

- `SA_TOKEN`: The Service Account Token the portal will use to query the data from Nexus. No token by default

## Docker image

Build a Docker image with:

```sh
docker build . --tag=sscx-portal
```

You can then run it with:

```sh
docker run -p 8080:8080 sscx-portal
```

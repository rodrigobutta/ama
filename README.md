# General

`fig build`

`fig up`

## Nodejs (API)

### Install and Build (if packages updated)
`fig build nodejs`

`./nodejs/npm install` (because we need VSCODE to have node_modules also, despite the working ones are in docker container )

### Run
`fig up nodejs`

### Debug VSCODE
(when up running): Start debug from VSCODE: `Docker: NodeJs`

### Test
`npm run test`

## Web (ReactJS)

### Install and Build (if packages updated)
`fig build web`

`./web/npm install` (because we need VSCODE to have node_modules also, despite the working ones are in docker container )

### Run
`fig up web`

### Debug VSCODE
(when up running): Start debug from VSCODE: `Docker: Web React Chrome`

## Mobile App (React Native)
Not over Docker. Using EXPO

### Config
`mobile/src/config/config.ts` Set nodejs port and current local IP (for example 192.160.0.120)

### Install and Build
`yarn install`

### Run
//  http://localhost:19002
`yarn start`    

# Run Prettier Batch
(shouldnt be needed but if we paste code from somewhere else)

(web and node)

`npx prettier --write .`
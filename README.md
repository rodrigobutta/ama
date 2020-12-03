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

# Run Prettier Batch
(shouldnt be needed but if we paste code from somewhere else)

(web and node)

`npx prettier --write .`
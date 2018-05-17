
# Raspberry Pi
## Prerequisites

- node: v8.11.2

## How to develop

On macOS:

```sh
cd /path/to/lights-sensor

# Install modules
npm install
npm run watch

# Provide .env
cp .env.example .env
vim .env

# Start
npm start
# with log
#npm run dev
```

## How to sync with Raspberry Pi

On macOS:

```sh
cd /path/to/lights-sensor
./cmds.sh upload
```


## How to run on Raspberry Pi

On Raspberry Pi:

```sh
cd /home/pi/lights
npm i -g pm2
npm install --production
./cmds.sh start
```

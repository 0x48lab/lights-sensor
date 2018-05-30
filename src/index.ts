import { ISensor, Sensor, MockSensor } from "./sensor"
import { IEndpoints, Endpoints, MockEndpoints } from "./endpoints"
import * as Debug from "debug"
import * as Dotenv from "dotenv"

Dotenv.config()
const debug = Debug('app')
const isMock = process.env.USE_MOCK === "true"

class Main {
    private sensor: ISensor
    private endpoints: IEndpoints
    private luxThreshold: number
    private isOpened: boolean = true

    constructor() {
        this.sensor = isMock ? new MockSensor() : new Sensor()
        this.endpoints = isMock ? new MockEndpoints() : new Endpoints()
        // on: 142.6, 105.8, 73.4,  ...
        // off: 4.9, 0.5, ...
        this.luxThreshold = 50
    }

    async loop() {
        try {
            let sensorResult = await this.sensor.getLux()
            debug(`lux=${sensorResult.lux}`)
            let currentIsOpened = sensorResult.lux > this.luxThreshold
            if (sensorResult.lux != -1 && this.isOpened != currentIsOpened) {
                debug(`currentIsOpened=${currentIsOpened}`)
                await this.endpoints.postMessage(currentIsOpened)
            }
            await this.wait(isMock ? 1 : 60)
            this.isOpened = currentIsOpened
            this.loop()
        } catch (e) {
            throw e
        }
    }

    wait(seconds: number) {
        return new Promise((resolve, reject) => {
            const interval = seconds * 1000
            setTimeout(() => {
                resolve()
            }, interval)
        })
    }
}

console.log(`Started: ${new Date().toISOString()}`)
let main = new Main()
main.loop()
.catch(err => {
    console.log(err)
})

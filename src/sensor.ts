import { ChildProcess, execFile, ExecFileOptions, ExecFileOptionsWithStringEncoding } from "child_process"
import * as path from "path"

export interface SensorResult {
    lux: number
}

export interface ISensor {
    getLux(): Promise<SensorResult>
}

export class Sensor implements ISensor {
    getLux(): Promise<SensorResult> {
        return new Promise<SensorResult>((resolve, reject) => {
            let options = {}
            const scriptPath = path.resolve(__dirname, `../tsl2561.py`)
            const child = execFile(scriptPath, [], options, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error:execFile: error=`, error)
                    return reject(error)
                }
                let luxIntensity = parseFloat(stdout.trim())
                resolve({
                    lux: luxIntensity,
                } as SensorResult)
            });
        })
    }
}

export class MockSensor implements ISensor {

    getLux(): Promise<SensorResult> {
        return new Promise<SensorResult>((resolve, reject) => {
            setTimeout(() => {
                let luxIntensity = Math.round(Math.random() * 2000) / 10
                console.log(`mock: luxIntensity=${luxIntensity}`)
                resolve({
                    lux: luxIntensity,
                } as SensorResult)
            }, 1000)
        })
    }

}

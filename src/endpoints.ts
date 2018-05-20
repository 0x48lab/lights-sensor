import axios from "axios"

export interface IEndpoints {
    postMessage(isOpened: boolean): Promise<any>
}

export class Endpoints implements IEndpoints {
    postMessage(isOpened: boolean): Promise<any> {
        const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL
        const message = isOpened ? `教室が明るくなった！誰かきたにゃん(＊˃ᆺ˂)` : `暗くなったにゃん、、誰もいないにゃん^ↀᴥↀ^`

        return axios.post(`${discordWebhookUrl}`, {
            username: process.env.DISCORD_USERNAME,
            content: message,
            // avatar_url: "",
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}

export class MockEndpoints implements IEndpoints {
    postMessage(isOpened: boolean): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                console.log(`posted! isOpened=${isOpened}, username=${process.env.DISCORD_USERNAME}, url=${process.env.DISCORD_WEBHOOK_URL}`)
                resolve()
            }, 1000)
        })
    }

}

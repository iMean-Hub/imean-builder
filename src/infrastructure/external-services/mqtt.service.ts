// mqtt.service.ts
import { Injectable } from '@nestjs/common';
import { connect, IClientOptions, MqttClient } from 'mqtt';

@Injectable()
export class MqttService {
  private client: MqttClient;

  constructor() {
    const options: IClientOptions = {
      host: 'mqtt://your-mqtt-broker',
      port: 1883, // 或者你自己的端口
      protocol: 'mqtt',
    };

    // 初始化 MQTT 客户端
    this.client = connect(options.host, options);
  }

  // 发布消息
  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`MQTT publish error: ${err}`);
      }
    });
  }

  // 订阅消息
  subscribe(topic: string, callback: (message: string) => void): void {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(`MQTT subscribe error: ${err}`);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });

    // 接收消息
    this.client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        callback(message.toString());
      }
    });
  }

  // 断开连接
  disconnect(): void {
    this.client.end();
  }
}

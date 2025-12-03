import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async sayHelloWorld() {
    try {
      return 'Hello World';
    } catch (error) {
      return error;
    }
  }
}

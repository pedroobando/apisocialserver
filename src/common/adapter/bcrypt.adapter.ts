import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { CriptoAdapter } from '../interfaces';

// import { HttpAdapter } from '../interfaces';

// implements HttpAdapter

@Injectable()
export class BCryptAdapter implements CriptoAdapter {
  private saltNumber = 10;

  // NOTE: hay que definirlo en el common.module.ts
  async hash(password: string): Promise<string> {
    try {
      const data = await bcrypt.hash(password, this.saltNumber);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(`This is a error - Check logs`);
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.log(error);
      throw new Error(`This is a error - Check logs`);
    }
  }
}

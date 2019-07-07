import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(private storage: Storage) { }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }

  set(key: string, value: any): Promise<any> {
    return this.storage.set(key, value);
  }

  remove(key): Promise<any> {
    return this.storage.remove(key);
  }
}


import { Storage } from '@ionic/storage';

async storeValue(key: string, value: any) {
  const storage = await Storage.create();
  await storage.set(key, value);
}
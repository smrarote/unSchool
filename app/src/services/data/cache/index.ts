export default class CacheManager {
  client = null;
  constructor() {}
  async get(key: string): Promise<object | null> {
    console.log(key);
    return null;
  }
  async set(key: string, data: object | null): Promise<boolean> {
    console.log(key, data);
    return false;
  }
}

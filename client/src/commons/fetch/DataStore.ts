import { BusinessObject, BusinessObjectWithoutId } from "../types";

const API_PREFIX = "api";

export default class DataStore<T extends BusinessObject> {
  private url: string;
  private subscribers = new Set<(data: Set<T>) => void>();

  data?: Set<T>;

  constructor(url: string) {
    this.url =
      API_PREFIX +
      "/" +
      url.trim().replaceAll(API_PREFIX, "").replaceAll("/", "");
  }

  private async doFetch(
    url: string,
    callback: (url: string) => Promise<void>
  ): Promise<void> {
    try {
      await callback(url);
    } catch (e) {
      console.error(e);
    }
  }

  private getById(id: number): T | undefined {
    if (this.data) {
      let other;
      for (const otherObj of this.data) {
        if (otherObj.id === id) {
          other = otherObj;
          break;
        }
      }
      return other;
    }
  }

  // Suscribers

  private notify(): void {
    if (this.isSync()) {
      this.subscribers.forEach((notify) => notify(this.data!));
    }
  }

  subscribe(notify: (data: Set<T>) => void) {
    this.subscribers.add(notify);
  }

  unsubscribe(notify: (data: Set<T>) => void) {
    this.subscribers.delete(notify);
  }

  // Init data

  async fetchAll(): Promise<void> {
    await this.doFetch(this.url, async (url) => {
      this.data?.clear(); // Better cleaning up for js engine
      this.data = undefined;
      const res = await fetch(url);
      this.data = new Set(await res.json());
      this.notify();
    });
  }

  async fetchById(id: number): Promise<void> {
    let obj: T;
    await this.doFetch(this.url + "/" + id, async (url) => {
      const res = await fetch(url);
      obj = await res.json();
      if (this.data) {
        const other = this.getById(id);
        if (other) {
          this.data.delete(other);
        }
        this.data.add(obj);
        this.notify();
      }
    });
  }

  isSync(): boolean {
    return !!this.url && !!this.data;
  }

  hasSuscribers(): boolean {
    return this.subscribers.size !== 0;
  }

  // Update store

  private checkForSyncBeforeProcessing(): void {
    if (!this.isSync()) {
      throw Error("Cannot perform unless data is fetched");
    }
  }

  async add(obj: BusinessObjectWithoutId<T>): Promise<void> {
    this.checkForSyncBeforeProcessing();
    await this.doFetch(this.url, async (url) => {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
      });
      obj.id = (await res.json()).id;
      this.data!.add(obj as T);
      this.notify();
    });
  }

  async update(obj: T): Promise<void> {
    this.checkForSyncBeforeProcessing();
    await this.doFetch(this.url, async (url) => {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(obj),
      });
      obj = await res.json();
      const other = this.getById(obj.id);
      if (other) {
        this.data!.delete(other);
      }
      this.data!.add(obj);
      this.notify();
    });
  }

  async delete(id: number): Promise<Boolean> {
    this.checkForSyncBeforeProcessing();
    let ok = false;
    await this.doFetch(this.url + "/" + id, async (url) => {
      const res = await fetch(url, {
        method: "DELETE",
      });
      const other = this.getById(id);
      ok = res.ok;
      if (other && ok) {
        // query should throws an exception but nvm
        this.data!.delete(other);
        this.notify();
      }
    });
    return ok;
  }
}

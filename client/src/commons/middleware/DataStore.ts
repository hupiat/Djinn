import { equalsIgnoreCase } from "../tools";
import { BusinessObject, WithoutId, DicoOf_Ids_And_Fields } from "../types";
import _ from "lodash";

// Observable pattern
export default class DataStore<T extends BusinessObject> {
  private url?: string;
  private subscribers = new Set<(data: Set<T>) => void>();

  // Should be readonly but as a low level stub would be just a ts thing
  // data is stated then in react components
  data?: Set<T>;

  // Init server API
  formatUrlThenSet(url: string, apiPrefix?: string): DataStore<T> {
    this.url = undefined;
    if (apiPrefix) {
      url = url.trim();
      const split = url.split("/");
      if (equalsIgnoreCase(split[0], apiPrefix)) {
        split.shift();
        url = split.join("/");
      }
      this.url = apiPrefix + "/" + url;
    } else {
      console.error("DataStore#formatUrlThenSet", apiPrefix, url);
    }
    return this;
  }

  constructor(url: string, apiPrefix?: string) {
    this.formatUrlThenSet(url, apiPrefix);
  }

  // Gets diffs from remote service (will not be handled by rsuite schema-typed)
  // --> [res: boolean, {id: fields[]}]
  async observeChanges(state: Array<T> | T): Promise<DicoOf_Ids_And_Fields<T>> {
    const isArray = Array.isArray(state);

    const consumer = async (obj: T): Promise<(keyof T)[]> => {
      let other = this.getById(obj.id);
      if (!other) {
        await this.fetchById(obj.id);
      }
      other = this.getById(obj.id);
      if (other) {
        return Object.keys(other)
          .map((key) => key as keyof T)
          .filter((key) => !_.isEqual(obj[key], other![key]));
      } else {
        console.error("DataStore#observeChanges: could not find : " + obj.id);
      }
      return [];
    };

    const predicate = async (): Promise<DicoOf_Ids_And_Fields<T>> => {
      const res = {};

      const assign = async (obj: T) => {
        const diffs = await consumer(obj);
        if (diffs.length) {
          Object.assign(res, { [obj.id]: diffs });
        }
      };

      if (isArray) {
        for (const obj of state) {
          assign(obj);
        }
      } else {
        assign(state);
      }

      return res;
    };

    const res = await predicate();

    if (isArray) {
      return res;
    }

    if (res[state.id]) {
      return { [state.id]: res[state.id] };
    }

    return {};
  }

  // Utilities

  isSync(): boolean {
    return !!this.data && !!this.url;
  }

  hasSuscribers(): boolean {
    return this.subscribers.size !== 0;
  }

  // Just to wrap requests
  static async doFetch(
    url: string,
    callback: (url: string) => Promise<void>
  ): Promise<void> {
    try {
      await callback(url);
    } catch (e) {
      // TODO : handle this better
      console.error(e);
    }
  }

  // data is public, stay private (to use a Set)
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
  // Listeners should update React states and manage data flow from this class

  private notify(): void {
    if (this.isSync()) {
      this.subscribers.forEach((notify) => notify(this.data!));
    }
  }

  subscribe(notify: (data: Set<T>) => void): void {
    this.subscribers.add(notify);
  }

  unsubscribe(notify: (data: Set<T>) => void): void {
    this.subscribers.delete(notify);
  }

  // Loads from server

  async fetchAll(): Promise<void> {
    await DataStore.doFetch(this.url!, async (url) => {
      this.data?.clear(); // Better cleaning up for js engine
      this.data = undefined;
      const res = await fetch(url);
      this.data = new Set(await res.json());
      this.notify();
    });
  }

  async fetchById(id: number): Promise<void> {
    await DataStore.doFetch(this.url! + "/" + id, async (url) => {
      const res = await fetch(url);
      const obj = await res.json();
      if (this.data) {
        const other = this.getById(id);
        if (other) {
          this.data.delete(other);
        }
      } else {
        this.data = new Set<T>();
      }
      this.data.add(obj);
      this.notify();
    });
  }

  // Update store remotely
  // Designed to lead backend API design itself =)

  private checkForSyncBeforeProcessing(): void {
    if (!this.isSync()) {
      throw Error("Cannot perform unless data is fetched");
    }
  }

  async add(obj: WithoutId<T>): Promise<void> {
    this.checkForSyncBeforeProcessing();
    await DataStore.doFetch(this.url!, async (url) => {
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
    await DataStore.doFetch(this.url!, async (url) => {
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
    await DataStore.doFetch(this.url! + "/" + id, async (url) => {
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

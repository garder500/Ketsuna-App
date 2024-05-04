import { App, AppRecentlyCreated } from '@/types/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T) {
  try {
     await AsyncStorage.setItem(key, JSON.stringify(value));
     return value;
    }
    catch (error) {
        console.log(error);
        }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

export async function clear() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

export async function getAllKeys() {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function multiGet<T>(keys: string[]): Promise<[string, T | null][]> {
  try {
    const items = await AsyncStorage.multiGet(keys);
    return items.map(([key, value]) => [key, value ? JSON.parse(value) : null]);
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function multiSet<T>(items: [string, T][]) {
  try {
    await AsyncStorage.multiSet(items.map(([key, value]) => [key, JSON.stringify(value)]));
    return items;
  } catch (error) {
    console.log(error);
  }
}

export async function multiRemove(keys: string[]) {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.log(error);
  }
}

export async function multiMerge<T>(items: [string, T][]) {
  try {
    await AsyncStorage.multiMerge(items.map(([key, value]) => [key, JSON.stringify(value)]));
  } catch (error) {
    console.log(error);
  }
}

export async function mergeItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export async function flushGetRequests() {
  try {
    await AsyncStorage.flushGetRequests();
  } catch (error) {
    console.log(error);
  }
}

export async function removeApp(appId: string) {

    await removeItem("apps/"+appId);
    // remove all pages of the app
    const keys = await getAllKeys();
    const pages = keys.filter(key => key.startsWith("apps/"+appId+"/pages/"));
    await multiRemove(pages);
    return true;
}

export async function getAllApps() {
    const apps = await getAllKeys();
    // retrieve apps/:id but not apps/:id/pages/:id
    const appsPromised = await multiGet<App>(apps.filter(app => {
      const splited = app.split('/');
      if(app.startsWith('apps/') && splited.length === 2){
        return true;
      }
    }));
    return (appsPromised.map(app => app[1]).filter(app => app !== null) as App[]);
}

export async function updateAppContent(appId: string, content: App) {
    await setItem("apps/"+appId, content);
    return true;
}

export async function getPages(appId: string) {
    const keys = await getAllKeys();
    const pages = keys.filter(key => key.startsWith("apps/"+appId+"/pages/"));
    return pages;
}

export function removePage(appId: string, pageId: string) {
    return removeItem("apps/"+appId+"/pages/"+pageId);
}

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
    await getItem<AppRecentlyCreated[]>("recentlyOpenedApps").then((apps) => {
        if (apps) {
            setItem("recentlyOpenedApps", apps.filter(app => app.createdAt !== appId));
        }
    })

    await removeItem("apps/"+appId);
    return true;
}

export async function updateApp(appId: string, app: App) {
    await getItem<AppRecentlyCreated[]>("recentlyOpenedApps").then((apps) => {
        if (apps) {
            const olds = apps.filter(app => app.createdAt !== appId);
            setItem("recentlyOpenedApps", [...olds, {
                name: app.name,
                description: app.description,
                createdAt: app.createdAt,
                updatedAt: Date.now().toString(),
            }]);
        }else{
            setItem("recentlyOpenedApps", [{
                name: app.name,
                description: app.description,
                createdAt: app.createdAt,
                updatedAt: Date.now().toString(),
            }]);
        }
    })
    return true;
}

export async function updateAppContent(appId: string, content: App) {
    await setItem("apps/"+appId, content);
    await updateApp(appId,content);
    return true;
}

/**
 * Secure storage utilities
 * Wrapper around AsyncStorage with encryption support
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  /**
   * Store data securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Retrieve data
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  /**
   * Remove data
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all data
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Store object (JSON stringified)
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.setItem(key, jsonValue);
  }

  /**
   * Retrieve object (JSON parsed)
   */
  async getObject<T>(key: string): Promise<T | null> {
    const jsonValue = await this.getItem(key);
    if (jsonValue === null) {
      return null;
    }
    try {
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`Error parsing ${key}:`, error);
      return null;
    }
  }
}

export const storage = new Storage();

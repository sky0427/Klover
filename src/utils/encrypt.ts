import EncryptedStorage from 'react-native-encrypted-storage';

const getEncryptedStorage = async (key: string) => {
  const storedData = await EncryptedStorage.getItem(key);

  return storedData ? JSON.parse(storedData) : null;
};

const setEncryptedStorage = async <T>(key: string, data: T) => {
  await EncryptedStorage.setItem(key, JSON.stringify(data));
};

const removeEncryptedStorage = async (key: string) => {
  const data = await getEncryptedStorage(key);

  if (data) {
    await EncryptedStorage.removeItem(key);
  }
};

export {getEncryptedStorage, setEncryptedStorage, removeEncryptedStorage};

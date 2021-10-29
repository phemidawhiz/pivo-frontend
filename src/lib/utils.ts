
import config from 'config';
import { TEXT_LENGTH } from 'config/constants';
import { format } from 'date-fns'

//Helper functions

//comma separation of search result count
export const makeCountCommaSeperated = (num: string | number) => {
  const p = parseFloat(String(num)).toFixed(2).split('.');
  const formattedCount = `${p[0].split('').reverse().reduce((acc, num, i) => {
    return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
  }, '')}.${p[1]}`;
  return formattedCount;
};

export const makeTextShorter = (param: string | null | undefined): string | null | undefined => {
  try {
    
    if (param !== null) {
      if(param && param?.length < TEXT_LENGTH) 
        return `${param?.substr(param?.length)}`
      return `${param?.substr(TEXT_LENGTH)}...`;
    }

    return null;
  } catch (e) {
      console.error(e.message);
      return null;
  }
}

export const getLocalWithExpiry = (key: string): any => {
  if(!localStorage) return null;

const itemStr = localStorage.getItem(key);
// if the item doesn't exist, return null
if (!itemStr) {
  return null;
}
const item = JSON.parse(itemStr);
const now = new Date();
// compare the expiry time of the item with the current time
if (now.getTime() > item.expiry) {
  // If the item is expired, delete the item from storage
  // and return null
  localStorage.removeItem(key)
  return null;
}
return item.value;
}

export const setLocalWithExpiry = (key: string, value: any, ttl: number): void => {
  if(!localStorage) return;

  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item));
}

export const formatDate = (datetime: string | Date) => {
  return format(
    new Date(datetime),
    'dd/MM/yyyy HH:mm a'
  )
}

export const formatDateTime = (datetime: string | undefined) => {
  if(datetime)
    return datetime.substr(0, 10);

  return 'No date';
}

export const composeClasses = (...styles: (string | boolean | undefined)[]): string => styles
  .filter(item => item)
  .join(' ')



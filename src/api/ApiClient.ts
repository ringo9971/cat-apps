import { ScheduledMenu, WeeklyMenu } from '@/types/market/Menu.ts';
import { format } from 'date-fns';
import {
  DocumentData,
  Firestore,
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { WithId } from 'types/WithId';
import { v4 as uuidv4 } from 'uuid';

export const createBaseMenu = (start: Date, end: Date): WeeklyMenu => {
  const d = new Date(start);
  const map = new Map<string, ScheduledMenu>();
  while (d <= end) {
    const key = format(d, 'yyyy-MM-dd');
    map.set(key, {
      date: key,
      name: '',
      category: '',
      difficulty: 'normal',
    });
    d.setDate(d.getDate() + 1);
  }
  return { menus: map };
};

const convertTimestampsToDates = (data: any): any => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (data instanceof Timestamp) {
    return data.toDate();
  }

  if (Array.isArray(data)) {
    return data.map((item) => convertTimestampsToDates(item));
  }

  const convertedData: { [key: string]: any } = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      convertedData[key] = convertTimestampsToDates(data[key]);
    }
  }
  return convertedData;
};

export class ApiClient {
  constructor(private firestore: Firestore) {}

  async get<T>(collection: string, path: string): Promise<T | null> {
    const docSnap = await getDoc(doc(this.firestore, collection, path));
    if (docSnap.data() == null) return null;
    return convertTimestampsToDates(docSnap.data()) as T;
  }

  async getList<T>(collection: string, path: string): Promise<T> {
    const docSnap = await getDoc(doc(this.firestore, collection, path));
    const data = convertTimestampsToDates(docSnap.data()?.list) ?? ([] as T);
    return data;
  }

  async addListItem<TData, TResult extends TData & WithId & { time: Date }>(
    collection: string,
    path: string,
    data: TData,
    prepend: boolean = false
  ): Promise<TResult> {
    const res = await this.getList<Array<TResult>>(collection, path);

    const addData = {
      id: uuidv4(),
      time: new Date(),
      ...data,
    } as TResult;

    if (prepend) {
      res.unshift(addData);
    } else {
      res.push(addData);
    }

    await setDoc(
      doc(this.firestore, collection, path),
      { list: res },
      { merge: true }
    );

    return addData as TResult;
  }

  async update<T extends DocumentData>(
    collection: string,
    path: string,
    data: T
  ): Promise<T> {
    await setDoc(doc(this.firestore, collection, path), data, { merge: true });

    return data;
  }

  async updateListItem<T extends WithId>(
    collection: string,
    path: string,
    data: T
  ): Promise<T> {
    const res = await this.getList<Array<T>>(collection, path);

    const updateListData = res.map((r) => (r.id === data.id ? data : r));

    await setDoc(
      doc(this.firestore, collection, path),
      { list: updateListData },
      { merge: true }
    );

    return data;
  }

  async deleteListItem<T extends WithId>(
    collection: string,
    path: string,
    data: T
  ): Promise<T> {
    const res = await this.getList<Array<T>>(collection, path);

    const updateListData = res.filter((r) => r.id !== data.id);

    await setDoc(
      doc(this.firestore, collection, path),
      { list: updateListData },
      { merge: true }
    );

    return data;
  }

  async getWeeklyMenu(start: Date, end: Date): Promise<WeeklyMenu> {
    const startKey = format(start, 'yyyy-MM-dd');
    const endKey = format(end, 'yyyy-MM-dd');

    const ref = collection(this.firestore, 'menu');
    const q = query(
      ref,
      where('__name__', '>=', startKey),
      where('__name__', '<=', endKey)
    );

    const snap = await getDocs(q);
    const plans = createBaseMenu(start, end);
    snap.forEach((doc) => {
      plans.menus.set(doc.id, {
        ...doc.data(),
      } as ScheduledMenu);
    });
    return plans;
  }

  async updateWeeklyMenu(plans: WeeklyMenu): Promise<WeeklyMenu> {
    const batch = writeBatch(this.firestore);
    const ref = collection(this.firestore, 'menu');
    plans.menus.forEach((menu, id) => {
      const docRef = doc(ref, id);
      batch.set(docRef, menu, { merge: true });
    });
    await batch.commit();

    return plans;
  }
}

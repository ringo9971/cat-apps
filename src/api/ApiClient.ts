import { doc, Firestore, getDoc, setDoc } from 'firebase/firestore';
import { WithId } from 'types/WithId';
import { v4 as uuidv4 } from 'uuid';

export class ApiClient {
  constructor(private firestore: Firestore) {}

  async getList<T>(collection: string, path: string): Promise<T> {
    const docSnap = await getDoc(doc(this.firestore, collection, path));
    const data = (docSnap.data()?.list as T) ?? ([] as T);
    console.log(JSON.stringify(data));
    return data;
  }

  async addListItem<T, U>(
    collection: string,
    path: string,
    data: T
  ): Promise<U> {
    const res = await this.getList<Array<T>>(collection, path);

    const addData = {
      id: uuidv4(),
      time: new Date(),
      ...data,
    };

    res.push(addData);

    await setDoc(
      doc(this.firestore, collection, path),
      { list: res },
      { merge: true }
    );

    return addData as U;
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
}

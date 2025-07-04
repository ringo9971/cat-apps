import * as admin from 'firebase-admin';
import { WishItem } from '../src/types/market/WishItem';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('../.secret/dev-cat-apps-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const main = async () => {
  const wishListRef = db.collection('market').doc('wishList');
  const refrigeratorListRef = db.collection('market').doc('refrigeratorList');

  try {
    const [wishListSnap, refrigeratorListSnap] = await Promise.all([
      wishListRef.get(),
      refrigeratorListRef.get(),
    ]);

    if (!wishListSnap.exists) {
      console.log('wishList が見つかりません。');
      return;
    }

    const wishList = (wishListSnap.data()?.list ?? []) as WishItem[];
    const refrigeratorList = (
      (refrigeratorListSnap.data()?.list ?? []) as WishItem[]
    ).filter((item) => item.tag === '食品');

    const checkedFoodItems = wishList.filter(
      (item) => item.tag === '食品' && item.check
    );

    if (checkedFoodItems.length === 0) {
      console.log('チェックされた食品はありません。');
      return;
    }

    const newWishList = wishList.filter(
      (item) => !(item.tag === '食品' && item.check)
    );
    const newRefrigeratorList = [...refrigeratorList, ...checkedFoodItems];

    const batch = db.batch();

    batch.update(wishListRef, { list: newWishList });
    batch.update(refrigeratorListRef, { list: newRefrigeratorList });

    await batch.commit();

    console.log('チェックされた食品を冷蔵庫に移動しました。');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

main();

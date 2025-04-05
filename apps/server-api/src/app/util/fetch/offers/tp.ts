import { Db } from 'mongodb';
import { tpMapper } from '../mappers/tp-mapper';
import { saveOffers } from './save-offers';

export const fetchTP = async (
  db: Db,
  url: string = process.env.OFFERS_TP_URL
) => {
  let addedOffersCount = 0;
  try {
    console.log('Fetching URL:', url);
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    const html = await response.text();
    const mappedOffers = tpMapper(html);

    addedOffersCount = await saveOffers(db, mappedOffers);
    console.log('Added offers count:', addedOffersCount);
  } catch (e) {
    console.error('Error fetching TP', e);
  }

  return addedOffersCount;
};

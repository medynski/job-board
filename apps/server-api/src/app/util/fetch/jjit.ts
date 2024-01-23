import { JustJoinItResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer } from '../../db/offer';
import { jjitMapper } from '../jjit-mapper';

export const fetchJJIT = async (
  db: Db,
  url: string = 'https://justjoin.it/_next/data/DmQr5DdAWN916zzpZb8kk/all-locations/javascript/remote_yes/with-salary_yes.json?slug=all-locations&slug=javascript&slug=remote_yes&slug=with-salary_yes'
) => {
  try {
    const response = await fetch(url);
    const body = (await response.json()) as JustJoinItResponse;
    const mappedOffers = jjitMapper(body);
    mappedOffers.forEach(async (offer) => {
      try {
        await addOffer(db, offer);
      } catch (e) {
        // we don't care about duplicates
      }
    });

    // console.log(body.pageProps.dehydratedState.queries[0].state.data.pages[0].data);
    return mappedOffers;
  } catch (e) {
    return [];
  }
};

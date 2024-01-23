import { JustJoinItResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer, getOfferByUniqId } from '../../db/offer';
import { jjitMapper } from '../jjit-mapper';

export const fetchJJIT = async (
  db: Db,
  url: string = 'https://justjoin.it/_next/data/DmQr5DdAWN916zzpZb8kk/all-locations/javascript/remote_yes/with-salary_yes.json?slug=all-locations&slug=javascript&slug=remote_yes&slug=with-salary_yes'
) => {
  const response = await fetch(url);
  const body = (await response.json()) as JustJoinItResponse;
  const mappedOffers = jjitMapper(body);
  mappedOffers
    .filter(async (offer) => {
      const offerDuplicates = await getOfferByUniqId(db, offer.uniqId);
      return (await offerDuplicates).length === 0;
    })
    .forEach(async (offer) => {
      await addOffer(db, offer);
    });

  // console.log(body.pageProps.dehydratedState.queries[0].state.data.pages[0].data);

  return mappedOffers;
};

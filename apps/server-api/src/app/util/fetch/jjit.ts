import { JustJoinItResponse, Offer } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer, getAllOffers } from '../../db/offer';
import { jjitMapper } from '../jjit-mapper';

export const fetchJJIT = async (
  db: Db,
  url: string = 'https://justjoin.it/_next/data/RfUNahOfhjbsBzf1smFoS/all-locations/javascript/remote_yes/with-salary_yes.json?slug=all-locations&slug=javascript&slug=remote_yes&slug=with-salary_yes'
) => {
  const response = await fetch(url);
  const body = (await response.json()) as JustJoinItResponse;
  const offersData = await getAllOffers(db);
  const mappedOffers = jjitMapper(body);
  const offersIds: string[] = offersData.map((o: Offer) => o.uniqId);
  mappedOffers
    .filter((offer) => !offersIds.includes(offer.uniqId))
    .forEach(async (offer) => {
      await addOffer(db, offer);
    });

  // console.log(body.pageProps.dehydratedState.queries[0].state.data.pages[0].data);

  return mappedOffers;
};

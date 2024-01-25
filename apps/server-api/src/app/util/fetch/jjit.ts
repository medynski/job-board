import { JustJoinItResponse } from '@job-board/api-interfaces';
import { Db } from 'mongodb';
import { addOffer } from '../../db/offer';
import { jjitMapper } from '../jjit-mapper';

export const fetchJJIT = async (
  db: Db,
  url: string = 'https://justjoin.it/_next/data/rToczUJPr4Qm8h_ndZtI1/all-locations/javascript/remote_yes/with-salary_yes.json?slug=all-locations&slug=javascript&slug=remote_yes&slug=with-salary_yes'
): Promise<number> => {
  let addedOffersCount = 0;

  try {
    const response = await fetch(url);
    const body = (await response.json()) as JustJoinItResponse;
    const mappedOffers = jjitMapper(body);
    await Promise.all(
      mappedOffers.map(async (offer) => {
        try {
          await addOffer(db, offer);
          addedOffersCount += 1;
        } catch (e) {
          // we don't care about duplicates
          console.error(
            'Something went wrong while fetching offers from JJIT.'
          );
        }
      })
    );

    // console.log(body.pageProps.dehydratedState.queries[0].state.data.pages[0].data);
  } catch (e) {
    console.error(e);
  }
  return addedOffersCount;
};

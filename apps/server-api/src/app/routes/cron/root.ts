import { Offer } from '@job-board/api-interfaces';
import { FastifyInstance, FastifyReply } from 'fastify';
import { JustJoinItResponse } from '../../model/jjit';
import { NoFluffJobsResponse } from '../../model/nofluffjobs';
import { offers } from '../../util/db';
import { jjitMapper } from '../../util/jjit-mapper';

export default async function (fastify: FastifyInstance) {
  fastify.get('/fetch-jjit', async (_, reply: FastifyReply) => {
    const response = await fetch(
      'https://justjoin.it/_next/data/RfUNahOfhjbsBzf1smFoS/all-locations/javascript/remote_yes/with-salary_yes.json?slug=all-locations&slug=javascript&slug=remote_yes&slug=with-salary_yes'
    );
    const body = (await response.json()) as JustJoinItResponse;
    const offersData = await offers.find({});
    const mappedOffers = jjitMapper(body);
    const offersIds: string[] = offersData.map((o: Offer) => o.uniqId);
    mappedOffers
      .filter((offer) => !offersIds.includes(offer.uniqId))
      .forEach(async (offer) => {
        await offers.insert(offer);
      });

    // console.log(body.pageProps.dehydratedState.queries[0].state.data.pages[0].data);
    reply.send('DB updated.');
  });

  fastify.get('/fetch-nofluffjobs', async (_, reply: FastifyReply) => {
    const response = await fetch(
      'https://nofluffjobs.com/api/search/posting?pageFrom=1&pageTo=1&pageSize=100&salaryCurrency=PLN&salaryPeriod=month&region=pl',
      {
        method: 'post',
        body: JSON.stringify({
          criteriaSearch: {
            country: [],
            city: ['remote'],
            more: [],
            employment: [],
            requirement: [],
            salary: [],
            jobPosition: [],
            province: [],
            company: [],
            id: [],
            category: ['frontend'],
            keyword: [],
            jobLanguage: [],
            seniority: [],
          },
          pageSize: 20,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const body = (await response.json()) as NoFluffJobsResponse;
    console.log(body.postings.length);
    reply.send(body.postings);
  });
}

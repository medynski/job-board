import { Offer } from '@job-board/api-interfaces';
import cors from 'cors';
import express from 'express';
import { Datastore } from 'nedb-async-await';
import fetch from 'node-fetch';
import * as path from 'path';
import { JustJoinItResponse } from './model/jjit';
import { NoFluffJobsResponse } from './model/nofluffjobs';
import { jjitMapper } from './util/jjit-mapper';

const offers = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to my-express-api...!' });
});

app.get('/fetch-nofluff', async (req, res) => {
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
  res.send(body.postings);
});

app.get('/offers', async (req, res) => {
  const offersData = await offers.find({});
  res.send(offersData);
});

app.get('/fetch-jjit', async (req, res) => {
  const response = await fetch(
    'https://justjoin.it/_next/data/_sRXau1nzJGS7UECH40LC/all-locations/javascript.json?slug=all-locations&slug=javascript'
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
  res.send('DB updated.');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

// serve static app
app.use('/', express.static(path.resolve(__dirname, './../client-react')));

app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, './../client-react/index.html'));
});

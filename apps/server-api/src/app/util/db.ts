import { Datastore } from 'nedb-async-await';
import path from 'path';

export const offers = Datastore({
  filename: path.resolve(path.dirname(''), './database/offers.db'),
  autoload: true,
});

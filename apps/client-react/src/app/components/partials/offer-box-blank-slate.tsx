import { FunctionComponent } from 'react';
import { BlankSlate } from './blank-slate';

export const OfferBoxBlankSlate: FunctionComponent = () => {
  return (
    <div className="border border-solid border-gray-300 rounded my-2.5 p-2.5 relative flex">
      <section className="mr-2.5">
        <BlankSlate width={72} height={72} />
      </section>
      <section>
        <div className="mb-1.5 flex">
          <div>
            <BlankSlate width={150} height={24} />
          </div>
        </div>
        <div className="text-xs my-2.5 text-gray-700">
          <BlankSlate width={100} height={12} />
        </div>

        <div className="text-xs">
          <BlankSlate width={250} />
        </div>

        <div className="absolute top-6 right-2.5">
          <BlankSlate width={109} height={24} />
        </div>

        <div className="absolute top-1.5 right-2.5">
          <BlankSlate width={52} height={14} />
        </div>
      </section>
    </div>
  );
};

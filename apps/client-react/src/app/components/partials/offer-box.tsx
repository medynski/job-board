import { css } from '@emotion/react';
import { CurrencyResponse, Offer } from '@job-board/api-interfaces';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Tooltip } from '@mui/material';
import { blue, grey, orange, yellow } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { formatCurrency } from '../../utils/format-currency';
import { formatDate } from '../../utils/format-date';
import { transformCurrency } from '../../utils/transform-currency';
import { CompanyLogo } from './company-logo';
import { FavoritesManage } from './favorites-manage';

export const OfferBox: FunctionComponent<{
  offer: Offer;
  exchangeRates: CurrencyResponse;
}> = ({ offer, exchangeRates }) => {
  return (
    <div className="rounded p-2 relative flex border-solid border-gray-700 border my-2.5">
      <section>
        <CompanyLogo companyLogoUrl={offer.companyLogoUrl} />
      </section>
      <section>
        <div
          css={css`
            font-weight: bold;
            margin-bottom: 5px;
            display: flex;
          `}
        >
          <div className="truncate w-36 md:w-auto">{offer.title}</div>
          <a
            className="material-symbols-outlined"
            css={css`
              margin-left: 5px;
              position: relative;
              top: -7px;
              text-decoration: none;

              &:hover {
                cursor: pointer;
                opacity: 0.5;
              }
            `}
            href={offer.url}
            target="_blank"
            rel="noreferrer"
          >
            <OpenInNewIcon
              css={css`
                font-size: 15px;
                fill: ${blue[700]};
              `}
            />
          </a>
        </div>
        <div
          css={css`
            font-size: 10px;
            margin-bottom: 10px;
            color: ${grey[700]};
          `}
        >
          {offer.companyName}
        </div>

        <div className="text-xs truncate w-[200px] md:w-full ">
          {offer.requiredSkills.join(' - ')}
        </div>

        {offer.salaryRange.from && offer.salaryRange.to && (
          <Tooltip
            title={`${formatCurrency(
              offer.salaryRange.from
            )} - ${formatCurrency(offer.salaryRange.to)} ${offer.currency}`}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            arrow
          >
            <div
              className="top-7 md:top-5.5 absolute text-xs right-2.5 p-1.5 rounded-sm font-bold"
              css={css`
                background-color: ${offer.currency !== 'pln'
                  ? orange[400]
                  : yellow[600]};
              `}
            >
              {transformCurrency(
                offer.salaryRange.from,
                offer.currency,
                exchangeRates
              )}{' '}
              -{' '}
              {transformCurrency(
                offer.salaryRange.to,
                offer.currency,
                exchangeRates
              )}{' '}
              <span className="text-xxs">pln</span>
            </div>
          </Tooltip>
        )}

        <div className="text-xxs absolute top-2.5 md:top-2 right-2.5 bg-gray-800 text-white font-bold rounded-sm py-0.5 px-1.5">
          {formatDate(offer.createdAt)}
        </div>

        <div className="absolute bottom-0 right-0">
          <FavoritesManage offerUniqId={offer.uniqId} />
        </div>
      </section>
    </div>
  );
};

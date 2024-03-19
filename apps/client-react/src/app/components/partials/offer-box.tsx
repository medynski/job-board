import { css } from '@emotion/react';
import { CurrencyResponse, Offer } from '@job-board/api-interfaces';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Tooltip } from '@mui/material';
import { blue, grey, orange, yellow } from '@mui/material/colors';
import { FunctionComponent } from 'react';
import { formatCurrency } from '../../utils/format-currency';
import { formatDate } from '../../utils/format-date';
import { transformCurrency } from '../../utils/transform-currency';
import { Box } from './box';
import { CompanyLogo } from './company-logo';
import { FavoritesManage } from './favorites-manage';

export const OfferBox: FunctionComponent<{
  offer: Offer;
  exchangeRates: CurrencyResponse;
}> = ({ offer, exchangeRates }) => {
  return (
    <Box>
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
          <div>{offer.title}</div>
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

        <div
          css={css`
            font-size: 12px;
          `}
          dangerouslySetInnerHTML={{
            __html: offer.requiredSkills.join(' &#8226; '),
          }}
        ></div>

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
              css={css`
                font-size: 12px;
                position: absolute;
                top: 24px;
                right: 10px;
                background-color: ${offer.currency !== 'pln'
                  ? orange[400]
                  : yellow[600]};
                padding: 5px;
                border-radius: 2px;
                font-weight: bold;
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
              <span
                css={css`
                  font-size: 8px;
                `}
              >
                pln
              </span>
            </div>
          </Tooltip>
        )}

        <div
          css={css`
            font-size: 8px;
            position: absolute;
            top: 5px;
            right: 10px;
            background-color: ${grey[800]};
            padding: 2px 5px;
            border-radius: 2px;
            font-weight: bold;
            color: #fff;
          `}
        >
          {formatDate(offer.createdAt)}
        </div>

        <div
          css={css`
            position: absolute;
            bottom: 0px;
            right: 0px;
          `}
        >
          <FavoritesManage offerUniqId={offer.uniqId} />
        </div>
      </section>
    </Box>
  );
};

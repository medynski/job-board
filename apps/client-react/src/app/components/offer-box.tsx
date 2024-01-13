import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Offer } from '@job-board/api-interfaces';
import { FunctionComponent } from 'react';
import { currency } from '../utils/currency';
import { date } from '../utils/date';
import { CompanyLogo } from './company-logo';

const Box = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  position: relative;
  display: flex;
`;

export const OfferBox: FunctionComponent<{ offer: Offer }> = ({ offer }) => {
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
              top: -2px;
              color: #4e71da;
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
            open_in_new
          </a>
        </div>
        <div
          css={css`
            font-size: 10px;
            margin-bottom: 10px;
            color: #383838;
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
          <div
            css={css`
              font-size: 12px;
              position: absolute;
              top: 20px;
              right: 10px;
              background-color: #fed11b;
              padding: 5px;
              border-radius: 2px;
              font-weight: bold;
            `}
          >
            {currency(offer.salaryRange.from)} -{' '}
            {currency(offer.salaryRange.to)}{' '}
            <span
              css={css`
                font-size: 8px;
              `}
            >
              {offer.currency}
            </span>
          </div>
        )}

        <div
          css={css`
            font-size: 8px;
            position: absolute;
            top: 5px;
            right: 10px;
            background-color: #383838;
            padding: 2px 5px;
            border-radius: 2px;
            font-weight: bold;
            color: #fff;
          `}
        >
          {date(offer.createdAt)}
        </div>
      </section>
    </Box>
  );
};

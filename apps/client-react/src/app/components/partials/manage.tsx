import { UserRole } from '@job-board/api-interfaces';
import { Button } from '@mui/material';
import { FunctionComponent } from 'react';
import { usePermissionsQuery } from '../../hooks/queries/usePermissions';
import { useUpdateOffersQuery } from '../../hooks/queries/useUpdateOffersQuery';

export const Manage: FunctionComponent = () => {
  const { fetchJIIT, fetchNFJ, fetchExchangeRates, fetchTP } =
    useUpdateOffersQuery();
  const { permissionsQuery } = usePermissionsQuery();

  if (
    permissionsQuery.isFetching ||
    permissionsQuery.data?.role !== UserRole.ADMIN
  ) {
    return null;
  }

  return (
    <div className="w-full md:w-96">
      <div className="text-sm mb-1.5">Manage offers:</div>

      <div className="flex mt-5 flex-row justify-between">
        <section className="flex flex-col">
          <div className="mb-2.5 text-[10px]">Update offers:</div>
          <div className="w-full flex justify-evenly">
            <Button
              onClick={() => fetchJIIT.mutate()}
              variant="outlined"
              className="mr-2.5"
            >
              JIIT
            </Button>
            <Button
              className="mr-2.5"
              onClick={() => fetchNFJ.mutate()}
              variant="outlined"
            >
              NFJ
            </Button>
            <Button onClick={() => fetchTP.mutate()} variant="outlined">
              TP
            </Button>
          </div>
        </section>

        <section className="flex flex-col">
          <div className="mb-2.5 text-[10px]">Update exchange rates:</div>
          <div>
            <Button
              onClick={() => fetchExchangeRates.mutate()}
              variant="contained"
            >
              ER
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

import { Offer } from '@job-board/api-interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FunctionComponent } from 'react';

export const TenstackQueryPlayground: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: addOffer } = useMutation({
    mutationFn: async (offer: Partial<Offer>) => {
      return offer;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  return <button onClick={() => addOffer({})}>mutate state</button>;
};

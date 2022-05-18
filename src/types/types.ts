import { AxiosError, AxiosResponse } from 'axios';

export default interface GetResponse <Data = unknown, Err = unknown> {
  error: AxiosError<Err> | null | undefined;
  loading: boolean;
  data: Data | undefined;
  response: AxiosResponse | undefined;
  isValidating: undefined | boolean;
  revalidate: () => Promise<boolean>
}

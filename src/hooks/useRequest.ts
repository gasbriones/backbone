/* eslint-disable */
import { useReducer } from 'react';
import useSWR from 'swr';
import axios, {
  AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError, Method,
} from 'axios';

axios.defaults.baseURL = 'https://bkbnchallenge.herokuapp.com';

enum ACTION_TYPE {
  REQUEST_START = 'REQUEST_START',
  REQUEST_END = 'REQUEST_END',
}

interface GetResponse<Data = unknown, Err = unknown> {
  error: null | undefined | AxiosError<Err>;
  loading: boolean;
  data: Data | undefined;
  response: AxiosResponse | undefined;
  isValidating: undefined | boolean;
  revalidate: () => Promise<boolean>
}

interface ReducerState<Data = unknown, Error = unknown> {
  loading: boolean;
  error: null | undefined | AxiosError<Error>;
  data: Data | null | undefined;
  response?: AxiosResponse<Data>;
}

interface WithExecute<Data = unknown, Err = unknown> extends ReducerState<Data, Err> {
  execute: (url: string, data?: unknown, clientConfig?: AxiosRequestConfig) => Promise<void>;
}

interface WithMutate<Data = unknown, Err = unknown> extends ReducerState<Data, Err> {
  mutate: (url: string, clientConfig: AxiosRequestConfig) => Promise<void>;
}

interface Action<Data = unknown, Err = unknown> {
  type: ACTION_TYPE;
  error?: boolean | null;
  payload?: (Err & { data: undefined }) | { data: Data } | null;
}

function configuredAxios<Data = unknown>(
  url: string,
  clientConfig: AxiosRequestConfig,
  token?: string | undefined,
): AxiosPromise<Data> {
  return axios({
    ...clientConfig,
    url,
    headers: { ...clientConfig.headers, ...(token !== undefined && { Authorization: `Bearer ${token}` }) },
  });
}

export function useGet<Data = unknown, Err = unknown>(
  url: string | null,
  clientConfig: AxiosRequestConfig = {},
  swrConfig = {},
): GetResponse<Data, Err> {
  const {
    // @ts-ignore
    data: response, error, isValidating, revalidate,
  } = useSWR(
    url,
    () => configuredAxios<Data>(url ?? '', clientConfig),
    { ...swrConfig },
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    loading: isValidating,
    revalidate,
  };
}

const createReducer = <Data = unknown, Err = unknown>() => function (
  state: ReducerState<Data, Err>,
  action: Action<Data, Err>,
): ReducerState<Data, Err> {
  switch (action.type) {
    case ACTION_TYPE.REQUEST_START:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case ACTION_TYPE.REQUEST_END:
      return {
        ...state,
        loading: false,
        data: action.payload?.data || undefined,
        [action.error ? 'error' : 'response']: action.payload,
      };
    default:
      return state;
  }
};

function useMutate<Data = unknown, Err = unknown>(): WithMutate<Data, Err> {
  const reducer = createReducer<Data, Err>();
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  const mutate = async (url: string, clientConfig: AxiosRequestConfig = {}) : Promise<void> => {
    try {
      dispatch({ type: ACTION_TYPE.REQUEST_START });
      const response = await configuredAxios<Data>(url, clientConfig);
      dispatch({ type: ACTION_TYPE.REQUEST_END, payload: response });
    } catch (err: any) {
      dispatch({ type: ACTION_TYPE.REQUEST_END, payload: err, error: true });
      throw err;
    }
  };
  return { mutate, ...state };
}

export function useExecute<Data = unknown, Err = unknown>(method: Method): WithExecute<Data, Err> {
  const { mutate, ...state } = useMutate<Data, Err>();
  const execute = async (url: string, data?: unknown, clientConfig: AxiosRequestConfig = {}) : Promise<void> => {
    await mutate(url, { method, data, ...clientConfig });
  };
  return { execute, ...state };
}

export function usePost<Data = unknown, Err = unknown>(): WithExecute<Data, Err> {
  return useExecute('POST');
}

export function useDelete<Data = unknown, Err = unknown>(): WithExecute<Data, Err> {
  return useExecute('DELETE');
}

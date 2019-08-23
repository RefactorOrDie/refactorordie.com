import { createContext, useContext } from "react";
import { Observable } from "rxjs";

interface BlocType {
  [property: string]: string | number | Symbol | Observable<any> | ((...args: any[]) => void)
}

interface Bloc<R extends BlocType> extends React.Context<R> {}

export function createBloc<R extends BlocType>(): Bloc<R> {
  return createContext(undefined as unknown as R)
}

export function useBloc<R extends BlocType>(context: Bloc<R>): R {
  return useContext(context)
}

type RepoType = {
  [property: string]: Observable<any> | ((...args: any[]) => (Promise<any> | void)) | any
}

interface Repo<R extends RepoType> extends React.Context<R> {}

export function createRepo<R extends RepoType>(): Repo<R> {
  return createContext(undefined as unknown as R)
}

export function useRepo<R extends RepoType>(context: Repo<R>): R {
  return useContext(context)
}

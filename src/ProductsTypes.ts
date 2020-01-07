import { ICuratedPhoto, IDataSearch } from "./ProductsData";
import { IProps } from "./PhotosPage";



export enum DataActionTypes {
  GETDATA = "GETDATA"
}

export enum SearchValueTypes {
  GETSEARCHVALUE = "GETSEARCHVALUE"
}

export enum SearchKeydownTypes {
  SEARCKEYDOWN = "SEARCKEYDOWN"
}

export enum GetSearchNameTypes {
  GETSEARCHNAME = "GETSEARCHNAME"
}

export enum GetDataSearchValueTypes {
  GETDATASEARCHVALUE = "GETDATASEARCHVALUE"
}


export interface IGetSearchValueAction {
  type: SearchValueTypes.GETSEARCHVALUE;
  searchValue: string;
}

export interface IDataLoadingAction {
  type: DataActionTypes.GETDATA;
  dataFromAPI: ICuratedPhoto;
}

export interface ISearchKeydownAction {
  type: SearchKeydownTypes.SEARCKEYDOWN;
  keydownKey: any;
}

export interface ISearchNameGetAction{
  type: GetSearchNameTypes.GETSEARCHNAME;
  props: IProps;
}

export interface IDataSearchValueAction{
  type:GetDataSearchValueTypes.GETDATASEARCHVALUE
  data: IDataSearch;
}


export type ProductsActions =
  | IDataLoadingAction
  | IGetSearchValueAction
  | ISearchKeydownAction
  | ISearchNameGetAction
  |IDataSearchValueAction


export interface IProductsState {
  readonly data: ICuratedPhoto | null;
  readonly productsLoading: boolean;
  readonly search: string;
  readonly keyboardKey: any;
  readonly searchDataFromInput: IDataSearch|null;
}

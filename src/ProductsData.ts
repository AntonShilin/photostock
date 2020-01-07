import { async } from "q";
import { watchFile } from "fs";
import { resolve } from "dns";
import { rejects } from "assert";

export interface IReview {
  comment: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface IDataSrc {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export interface IData {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: string;
  liked: boolean;
  src: IDataSrc;
}

export interface ICuratedPhoto {
  page: number;
  per_age: number;
  next_page: string;
  photos: IData[];
}

export interface IDataSearch {
  total_results: number;
  page: number;
  per_page: number;
  photos: IData[];
}

export const getProducts = async (): Promise<IProduct[]> => {
  await wait(1000);
  return products;
};

const wait = (ms: number): Promise<void> => {
  // tslint:disable-next-line: no-shadowed-variable
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getProduct = async (id: number): Promise<IProduct | null> => {
  await wait2(1000);
  const foundProducts = products.filter(customer => customer.id === id);
  return foundProducts.length === 0 ? null : foundProducts[0];
};

const wait2 = (ms: number): Promise<any> => {
  // tslint:disable-next-line: no-shadowed-variable
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const doSomething = async (): Promise<ICuratedPhoto> => {
  const keyAPI: string =
    "563492ad6f9170000100000148298afd943a453c8f3f48bdbc9811a9";
  // tslint:disable-next-line: no-shadowed-variable
  try {
    const response = await fetch(
      "https://api.pexels.com/v1/curated?per_page=100&page=1",
      {
        headers: { Authorization: keyAPI }
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const doSearchInputValue = async (name:string): Promise<IDataSearch[]> => {
  const keyAPI: string =
    "563492ad6f9170000100000148298afd943a453c8f3f48bdbc9811a9";
  // tslint:disable-next-line: no-shadowed-variable
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${name}+query&per_page=100&page=1`,
      {
        headers: { Authorization: keyAPI }
      }
    );
    const data = await response.json();
    console.log(data);
     return data;
  } catch (err) {
    return err;
  }
};

export const products: IProduct[] = [
  {
    description:
      "A collection of navigational components that composedeclaratively with your app",
    id: 1,
    name: "React Router",
    price: 8
  },
  {
    description: "A library that helps manage state across yourapp",
    id: 2,
    name: "React Redux",
    price: 12
  },
  {
    description: "A library that helps you interact with a GraphQL backend",
    id: 3,
    name: "React Apollo",
    price: 12
  }
];

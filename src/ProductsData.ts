import { async } from "q";
import { watchFile } from "fs";
import { resolve } from "dns";
import { rejects } from "assert";

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

export interface IPopularVideos {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: IVideos[];
}

interface IVideos {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  full_res: null;
  tags: [];
  duration: number;
  user: IUserVideo;
  video_files: IVideoFiles[];
  video_pictures: IVideoPictures[];
}

interface IUserVideo {
  id: number;
  name: string;
  url: string;
}

interface IVideoFiles {
  id: number;
  quality: string;
  file_type: string;
  width: number;
  height: number;
  link: string;
}

interface IVideoPictures {
  id: number;
  picture: string;
  nr: number;
}

export const getPhotos = async (): Promise<ICuratedPhoto> => {
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

export const doSearchInputValue = async (
  name: string
): Promise<IDataSearch[]> => {
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
    return data;
  } catch (err) {
    return err;
  }
};

export const searchVideos = async (): Promise<any> => {
  const keyAPI: string =
    "563492ad6f9170000100000148298afd943a453c8f3f48bdbc9811a9";
  // tslint:disable-next-line: no-shadowed-variable
  try {
    const response = await fetch(
      "https://api.pexels.com/videos/search?query=italy+query&per_page=15&page=1",
      {
        headers: { Authorization: keyAPI }
      }
    );
    const data = await response.json();
    console.log(data);
    //return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getPopularVideos = async (): Promise<IPopularVideos[]> => {
  const keyAPI: string =
    "563492ad6f9170000100000148298afd943a453c8f3f48bdbc9811a9";
  // tslint:disable-next-line: no-shadowed-variable
  try {
    const response = await fetch(
      "https://api.pexels.com/videos/popular?per_page=100&page=1",
      {
        headers: { Authorization: keyAPI }
      }
    );
    const data = await response.json();
    console.log(data);
     return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


/* photo */
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

/* video */
export interface IPopularVideos {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: IVideos[];
}

interface IVideos {
  lenght: number;
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

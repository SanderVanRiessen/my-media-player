export interface errorMessage {
  message: string;
}
export interface track {
    id: string; 
    name: string; 
    uri: string; 
    artists: {name: string}[]; 
    onPressPlay: (id: string) => void;
}

export interface album {
    name: string;
    artists: {name: string}[];
    tracks: track[];
    images: {url: string}[];
    onPressPlay: (id: string) => void;
}

export interface response {
  data: {album: album};
  errors?: errorMessage[];
}

export interface dataState {
    error: errorMessage[] | null;
    loading: boolean;
    data: album | null
}

export interface currentTrack {
    track: track;
    albumName: string;
    images: {url: string}[]
}
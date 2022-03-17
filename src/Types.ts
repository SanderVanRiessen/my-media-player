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
    id: string;
    name: string;
    artists: {name: string}[];
    tracks: track[];
    images: {url: string}[];
    onPressPlay: (id: string) => void;
}

export interface response {
  data: {albums: album[]};
  errors?: errorMessage[];
}
export interface searchResponse {
  data: {album: album};
  errors?: errorMessage[];
}

export interface dataState {
    error: errorMessage[] | null;
    loading: boolean;
    data: album[] | null
}
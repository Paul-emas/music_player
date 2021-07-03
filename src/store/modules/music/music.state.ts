export type State = {
  trendingPlaylist: any[];
  kygoPlaylist: any[];
  marshMelloPlayList: any[];
  selectedPlayist: any[];
  selectedTrack: any;
  errorMessage: string;
  loading: boolean;
  isLiked: boolean;
};

export const state: State = {
  trendingPlaylist: [],
  kygoPlaylist: [],
  marshMelloPlayList: [],
  selectedPlayist: [],
  selectedTrack: null,
  errorMessage: '',
  loading: false,
  isLiked: false,
};

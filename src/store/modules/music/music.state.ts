export type State = {
  trendingPlaylist: Array<any>;
  kygoPlaylist: Array<any>;
  marshMelloPlayList: Array<any>;
  selectedPlayist: Array<any>;
  selectedTrack: any;
  errorMessage: boolean;
  loading: boolean;
  isLiked: boolean;
};

export const state: State = {
  trendingPlaylist: [],
  kygoPlaylist: [],
  marshMelloPlayList: [],
  selectedPlayist: [],
  selectedTrack: null,
  errorMessage: false,
  loading: false,
  isLiked: false,
};

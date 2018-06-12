export class User {
  accessToken: string;
  tokenSecret: string;
  twitterData: TwitterUser;
}

export interface TwitterUser {
  name: string;
  screen_name: string;
  id: number;
  id_str: string;
  profile_image_url: string;
  protected: boolean;
  statuses_count: number;
}

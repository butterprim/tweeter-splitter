import { TwitterUser, User } from './user';

export interface Tweet {
  id: number;
  id_str: string;
  created_at: string;
  text: string;
  truncated: boolean;
  in_reply_to_status_id?: number;
  in_reply_to_status_id_str?: string;
  in_reply_to_user_id?: number;
  in_reply_to_user_id_str?: string;
  in_reply_to_screen_name?: string;
  user: TwitterUser;
  is_quote_status: boolean;
  quoted_status?: Tweet;
  retweeted: boolean;
  retweeted_status?: Tweet;
}

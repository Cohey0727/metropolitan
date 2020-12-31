export type AuthUser = {
  sub: string;
  email: string;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
  email_verified: boolean;
  locale?: string;
  given_name?: string;
  family_name?: string;
};

export type User = {
  user_id: string;
  name: string;
  family_name: string;
  given_name: string;
  nickname: string;
  email: string;
  locale: string;
  picture: string;
  created_at: Date;
  updated_at: Date;
};

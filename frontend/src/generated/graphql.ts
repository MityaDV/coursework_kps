export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChatRoomGraphQl = {
  __typename?: 'ChatRoomGraphQL';
  chatName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: ChatRoomGraphQl;
  sendMessage: UserMessageGraphQl;
  userLogin: UserRegisterGraphQl;
  userRegister: UserRegisterGraphQl;
};


export type MutationSendMessageArgs = {
  data: UserMessageInputGraphQl;
};


export type MutationUserLoginArgs = {
  data: UserRegisterInputGraphQl;
};


export type MutationUserRegisterArgs = {
  data: UserRegisterInputGraphQl;
};

export type Query = {
  __typename?: 'Query';
  checkAuthorizationUser: UserGraphQl;
  helloWorld?: Maybe<Scalars['String']>;
  sayHi: Scalars['String'];
  userChatInfo: Array<UserChatInfoGraphQl>;
};


export type QuerySayHiArgs = {
  msg?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  chatUpdates: UserChatInfoGraphQl;
};

export type UserChatInfoGraphQl = {
  __typename?: 'UserChatInfoGraphQL';
  chat: ChatRoomGraphQl;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message?: Maybe<Scalars['String']>;
  user: UserGraphQl;
};

export type UserGraphQl = {
  __typename?: 'UserGraphQL';
  created: Scalars['DateTime'];
  id: Scalars['Int'];
  userName: Scalars['String'];
};

export type UserMessageGraphQl = {
  __typename?: 'UserMessageGraphQl';
  chat: ChatRoomGraphQl;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
  user: UserGraphQl;
};

export type UserMessageInputGraphQl = {
  chatId: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  message: Scalars['String'];
  userId: Scalars['Int'];
};

export type UserRegisterGraphQl = {
  __typename?: 'UserRegisterGraphQL';
  token: Scalars['String'];
  user: UserGraphQl;
};

export type UserRegisterInputGraphQl = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

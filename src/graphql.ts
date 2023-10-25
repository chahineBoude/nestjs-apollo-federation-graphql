
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Bookmark {
    id: string;
    title: string;
    description?: Nullable<string>;
    link: string;
    user?: Nullable<User>;
}

export class User {
    id: string;
    bookmarks?: Nullable<Nullable<Bookmark>[]>;
    firstName?: Nullable<string>;
    middleName?: Nullable<string>;
    lastName?: Nullable<string>;
    email: string;
    password: string;
}

export abstract class IQuery {
    abstract bookmarks(): Nullable<Nullable<Bookmark>[]> | Promise<Nullable<Nullable<Bookmark>[]>>;

    abstract bookmarkByUser(userId?: Nullable<number>): Nullable<Nullable<Bookmark>[]> | Promise<Nullable<Nullable<Bookmark>[]>>;

    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createBookmark(userId: number, title: string, link: string): Nullable<Bookmark> | Promise<Nullable<Bookmark>>;

    abstract modifyBookmark(id: number, title?: Nullable<string>, description?: Nullable<string>, link?: Nullable<string>): Nullable<Bookmark> | Promise<Nullable<Bookmark>>;

    abstract deleteBookmark(id: number): Nullable<Bookmark> | Promise<Nullable<Bookmark>>;

    abstract modifyName(id: number, firstName?: Nullable<string>, middleName?: Nullable<string>, lastName?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;

    abstract deleteUser(id: number): User | Promise<User>;

    abstract createUser(email: string, password: string): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;

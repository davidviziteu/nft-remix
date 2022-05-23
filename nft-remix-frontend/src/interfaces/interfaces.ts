export interface IAuthor {
    name: string;
    email: string;
    photoUrl: string;
}

export interface ISiteInfo {
    siteEmail: string;
    siteAuthors: IAuthor[];
}
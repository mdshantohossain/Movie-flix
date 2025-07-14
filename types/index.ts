


export type LoginFormDataType = {
    email: string;
    password: string;
}

export type RegisterFormDataType = {
    username: string;
    email: string;
    password: string;
}


export type UserType = {
    username: string;
    email: string;
}

export type VideoType = {
    $id: string;
    title: string;
    thumbnail: string;
    video: string;
    prompt: string;
    creator?: {
        username: string;
        avatar: string;
    }
}
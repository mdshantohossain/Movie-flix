import { Client, Account, ID, Databases, Query, Models } from "react-native-appwrite";
import config from "@/config/appwrite";
import { RegisterFormDataType, VideoType } from "@/types";
import uuid from "react-native-uuid";
// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint) // Your Appwrite Endpoint
  .setProject(config.projectId) // Your project ID
  .setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const databases = new Databases(client);

// register new user
export const createUser = async ({
  username,
  email,
  password,
}: RegisterFormDataType) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;
    const avatarUrl = `${config.endpoint}/avatars/initials?name=${encodeURIComponent(username)}&width=100&height=100`;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        username,
        email,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

// sign in
export const signIn = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

// get current user 
export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    
    if(!currentUser) throw Error;

    return await currentUser.documents[0];

  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

// get latest videos
export const getAllPosts = async (): Promise<VideoType[]> => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents.map((document: Models.Document) => ({
      $id: uuid.v4(),
      title: document.title,
      thumbnail: document.thumbnail,
      video: document.video,
      prompt: document.prompt,
      creator: document.creator,
    }));
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
};

// get latest videos
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
   
    return posts.documents.map((document: Models.Document) => ({
      $id: uuid.v4(),
      title: document.title,
      thumbnail: document.thumbnail,
      video: document.video,
      prompt: document.prompt,
      creator: document.creator,
    }));
    
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message);
  }
}


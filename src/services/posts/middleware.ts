import { baseUrl } from "@/configs/config";
import { postsApi } from "@/services/posts";
import {listenerMiddleware} from "@/stores/store";

const endpoint = 'posts';
async function fetchPostDetailsAsync(id: string) {
    const response = await fetch(`${baseUrl}/${endpoint}/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch post details for id: ${id}`);
    }
    return response.json();
}

listenerMiddleware.startListening({
    matcher: postsApi.endpoints.getAllPosts.matchFulfilled,
    effect: async (action, listenerApi) => {
      const posts = action.payload;
      console.log('List post: ', posts);
  
      for (const post of posts) {
        try {
          const details = await fetchPostDetailsAsync(post.id);
          listenerApi.dispatch({
            type: 'posts/postDetailsReceived',
            payload: { postId: post.id, details },
          });
        } catch (error) {
          console.error(`Error get detail post ${post.id}:`, error);
        }
      }
    },
  });
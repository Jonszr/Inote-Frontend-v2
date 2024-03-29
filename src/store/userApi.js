import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'


//build api object using "createApi"

const userApi = createApi({
    reducerPath: 'userApi', // Api的标识，不能和其他的Api或reducer重复
    baseQuery: fetchBaseQuery({
        baseUrl: `https://inote-backend.herokuapp.com/` ,

        prepareHeaders: (headers, { getState }) => {

           const token =  getState().user.token
            
            headers.set('Authorization',`Bearer ${token}`)
            headers.set('Accpet','*/*')
            return headers
        }
    }),
    tagTypes: ['user','posts','userphoto','publicposts'],
    endpoints(build) {
        return {
            //login post请求
            login: build.mutation({
                query({ email, password }) {

                    return {
                        url: 'blog/signin',
                        method: 'post',
                        body: {
                            email,
                            password
                        }
                    }
                }


            }),
            //signup post请求
            signup: build.mutation({
                query({ email, password, name }) {

                    return {
                        url: 'blog/signup',
                        method: 'post',
                        body: {
                            email,
                            password,
                            name
                        }
                    }
                }
            }),

            //updateUser post
            updateUser: build.mutation({
                query({ userId,user }) {
                    
                    
                    return {
                        url: `blog/user/${userId}`,
                        method: 'put',

                        body: user
                    }
                },
                invalidatesTags:['user']
            }),
            //check user exists in backend server
            isAuth: build.mutation({
                query({token}){
                    
                    return {
                        url:'blog/auth',
                        method:'post',
                        body:{token}
                    }
                }
                
            }),
            //get public user by id
            getuserById: build.query({ //public search
                query(userid){
                    return `blog/user/public/${userid}`;
                },
                keepUnusedDataFor:60,
                providesTags:['user']
            }),
            //get public user by name
            getuserByName: build.query({ //public search
                query(username){
                    return `blog/user/finduserbyname/${username}`;
                },
                keepUnusedDataFor:60,
                providesTags:['user']
            }),
            //get all posts of public by userid
            getPostsByUser: build.query({ //public search
                query(userid){
                    return `blog/posts/by/public/${userid}`
                },
                keepUnusedDataFor:60,
                providesTags:['posts']
            }),
            //add user follower
            addFollow: build.mutation({
                query(followId){
                    return {
                        url: `blog/user/add/follow`,
                        method: 'put',

                        body: followId
                    }
                },
                
                invalidatesTags:['user']
            }),
            //remove userfollower
            removeFollow: build.mutation({
                query(unfollowId){
                    return {
                        url: `blog/user/remove/follow`,
                        method: 'put',

                        body: unfollowId
                    }
                },
                invalidatesTags:['user']
            }),

            //delete post api
            deletePost: build.mutation({
                query({postId}){
                    
                    return{
                        url:`blog/post/${postId}`,
                        method:'delete'
                    }
                },
                invalidatesTags:['posts']
            }),
            //create post api
            createPost: build.mutation({
                query({userId,post}){
                    return{
                        url: `blog/post/new/${userId}`,
                        method:'post',
                        body:post
                    }
                },
                invalidatesTags:['posts','publicposts']
            }),
            
            getAllPublicPosts: build.query({
                query(){
                    return 'blog/posts';
                    
                },
                keepUnusedDataFor:60,
                providesTags:['publicposts']
            }),
            forgotPassword: build.mutation({
                query({email}){
                    return{
                        url: `blog/forgot-password`,
                        method:'put',
                        body:{email}

                    }
                }
            }),
            resetPassword: build.mutation({
                query({newPassword,resetPasswordLink}){
                    return{
                        url:`blog/reset-password`,
                        method:'put',
                        body:{newPassword,resetPasswordLink}
                    }
                }
            }),
            comment: build.mutation({
                query({comment,userId,postId}){
                    return{
                        url:`blog/post/comment`,
                        method:'put',
                        body:{comment,userId,postId}
                    }
                },
                invalidatesTags:['posts','publicposts']
            }),
            uncomment: build.mutation({
                query({postId,comment}){
                    return{
                        url:`blog/post/uncomment`,
                        method:'put',
                        body:{postId,comment}
                    }
                },
                invalidatesTags:['posts','publicposts']
            }),
            updateComment:build.mutation({
                query({postId,comment}){
                    return{
                        url:`blog/post/updatecomment`,
                        method:'put',
                        body:{postId,comment}
                    }
                },
                invalidatesTags:['posts','publicposts']
            }),


        }
    }



})



export const {
    useLoginMutation,
    useSignupMutation,
    useUpdateUserMutation,
    useIsAuthMutation,
    useGetuserByIdQuery,
    useGetPostsByUserQuery,
    useAddFollowMutation,
    useRemoveFollowMutation,
    useDeletePostMutation,
    useCreatePostMutation,
    useGetAllPublicPostsQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useCommentMutation,
    useUncommentMutation,
    useUpdateCommentMutation,
    useGetuserByNameQuery,
    
} = userApi;

export default userApi;
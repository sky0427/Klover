import {
  addCommentLike,
  addCommPostLike,
  addCommPostSave,
  deleteComment,
  deleteCommentLike,
  deleteCommPost,
  deleteCommPostLike,
  deleteCommPostSave,
  getCommPostComment,
  getCommPostDetail,
  modifyComment,
  modifyCommPost,
  searchCommPost,
  writeCommPost,
  wrtieComment,
} from '@/api/commPostApi';
import {queryKeys} from '@/constants/keys';
import {commNavigations} from '@/constants/navigations';
import {CommStackParamList} from '@/navigations/stack/CommStackNavigator';
import {
  CommentDeleteRequest,
  CommentDto,
  CommentLikeRequest,
  CommentModifyRequest,
  CommentWriteRequest,
  CommPostDetailDto,
  CommPostDto,
  CommPostModifyRequest,
  CommPostRequest,
  CommPostWriteRequest,
  KloverPage,
} from '@/types';
import queryClient from '@/utils/queryClient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {ToastAndroid} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';

const useSearchCommPostInfiniteQuery = (
  keyword: string,
  sort: string | undefined,
  language: string,
  content: boolean,
  nickname: boolean,
  mapX: number,
  mapY: number,
) => {
  const queryResult = useInfiniteQuery<KloverPage<CommPostDto>, Error>({
    queryKey: [
      queryKeys.SEARCH_COMM_POST,
      keyword,
      sort,
      language,
      content,
      nickname,
      mapX,
      mapY,
    ],
    queryFn: async ({pageParam = 0}: any): Promise<KloverPage<CommPostDto>> => {
      const response = await searchCommPost(
        pageParam,
        15,
        keyword,
        sort,
        language,
        content,
        nickname,
        mapX,
        mapY,
      );

      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    // 검색 조건이 바뀔 때마다 캐시를 초기화
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
  return queryResult;
};

const useCommPostDetailQuery = (id: number) => {
  const queryResult = useQuery<CommPostDetailDto, Error>({
    queryKey: [queryKeys.GET_COMM_POST_DETAIL, id],
    queryFn: async (): Promise<CommPostDetailDto> => {
      const response = await getCommPostDetail(id);
      return response;
    },
  });

  return queryResult;
};

const useGetCommPostCommentInfiniteQuery = (postId: number) => {
  const queryResult = useInfiniteQuery<KloverPage<CommentDto>, Error>({
    queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
    queryFn: async ({pageParam = 0}: any): Promise<KloverPage<CommentDto>> => {
      const response = await getCommPostComment(pageParam, 10, postId);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.pageNumber + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  return queryResult;
};

const useAddCommentLikeMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommentLikeRequest>({
    mutationFn: (req: {commentId: number}): Promise<void> => {
      return addCommentLike(req);
    },
    onSuccess: (_, variables) => {
      ToastAndroid.show('좋아요 추가 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });

      /*
      queryClient.setQueriesData<InfiniteData<KloverPage<CommentDto>>>(
        {
          queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
        },
        oldData => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData, // 기존 데이터의 모든 필드를 복사
            pages: oldData.pages.map(page => ({
              // pages 배열의 각 페이지를 순회
              ...page, // 페이지의 모든 필드를 복사
              contents: page.contents.map(
                (
                  comment, // 각 페이지의 댓글들을 순회
                ) =>
                  comment.id === variables.commentId // 특정 댓글을 찾아서
                    ? {
                        // 찾은 경우
                        ...comment, // 기존 댓글 정보 복사
                        isLiked: true, // 좋아요 상태 변경
                        likeCount: comment.likeCount + 1, // 좋아요 수 증가
                      }
                    : comment, // 다른 댓글은 그대로 유지
              ),
            })),
          };
        },
      );
      */
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 좋아요 추가 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useDeleteCommentLikeMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommentLikeRequest>({
    mutationFn: (req: {commentId: number}): Promise<void> => {
      return deleteCommentLike(req);
    },
    onSuccess: (_, variables) => {
      ToastAndroid.show('좋아요 삭제 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });

      /*
      queryClient.setQueriesData<InfiniteData<KloverPage<CommentDto>>>(
        {
          queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
        },
        oldData => {
          if (!oldData) {
            return oldData;
          }

          return {
            ...oldData, // 기존 데이터의 모든 필드를 복사
            pages: oldData.pages.map(page => ({
              // pages 배열의 각 페이지를 순회
              ...page, // 페이지의 모든 필드를 복사
              contents: page.contents.map(
                (
                  comment, // 각 페이지의 댓글들을 순회
                ) =>
                  comment.id === variables.commentId // 특정 댓글을 찾아서
                    ? {
                        // 찾은 경우
                        ...comment, // 기존 댓글 정보 복사
                        isLiked: false, // 좋아요 상태 변경
                        likeCount: comment.likeCount - 1, // 좋아요 수 증가
                      }
                    : comment, // 다른 댓글은 그대로 유지
              ),
            })),
          };
        },
      );
      */
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 좋아요 삭제 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useAddCommPostLikeMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommPostRequest>({
    mutationFn: (req: {commPostId: number}): Promise<void> => {
      return addCommPostLike(req);
    },
    onSuccess: () => {
      ToastAndroid.show('좋아요 추가 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_DETAIL, postId],
      });
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 좋아요 추가 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useDeleteCommPostLikeMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommPostRequest>({
    mutationFn: (req: {commPostId: number}): Promise<void> => {
      return deleteCommPostLike(req);
    },
    onSuccess: () => {
      ToastAndroid.show('좋아요 삭제 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_DETAIL, postId],
      });
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 좋아요 삭제 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useAddCommPostSaveMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommPostRequest>({
    mutationFn: (req: {commPostId: number}): Promise<void> => {
      return addCommPostSave(req);
    },
    onSuccess: () => {
      ToastAndroid.show('북마크 추가 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_DETAIL, postId],
      });
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 북마크 추가 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useDeleteCommPostSaveMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommPostRequest>({
    mutationFn: (req: {commPostId: number}): Promise<void> => {
      return deleteCommPostSave(req);
    },
    onSuccess: () => {
      ToastAndroid.show('북마크 삭제 성공', ToastAndroid.SHORT);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_DETAIL, postId],
      });
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message}에 의해 북마크 삭제 실패`,
        ToastAndroid.SHORT,
      );
    },
  });
  return mutation;
};

const useDeleteCommPostMutation = (postId: number) => {
  const navigation = useNavigation();
  const mutation = useMutation<void, Error, CommPostRequest>({
    mutationFn: (req: {commPostId: number}): Promise<void> => {
      return deleteCommPost(req);
    },
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{name: commNavigations.COMM_DETAIL as never}],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_DETAIL, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });
    },
    onError: error => {
      ToastAndroid.show(
        `${error.message} 때문에 스토리 삭제 실패`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

const useWriteCommPostMutation = () => {
  const navigation = useNavigation<StackNavigationProp<CommStackParamList>>();
  const mutation = useMutation<CommPostDto, Error, CommPostWriteRequest>({
    mutationFn: (req: {
      mapX: number;
      mapY: number;
      content: string;
      img: ImageOrVideo | undefined;
    }) => {
      return writeCommPost(req);
    },
    onSuccess: data => {
      navigation.reset({
        index: 0,
        routes: [{name: commNavigations.COMM_DETAIL, params: {id: data.id}}],
      });
    },
    onError: err => {
      ToastAndroid.show(
        `${err.message} 때문에 작성에 실패함`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

const useModifyCommPostMutation = (postId: number) => {
  const navigation = useNavigation<StackNavigationProp<CommStackParamList>>();
  const mutation = useMutation<void, Error, CommPostModifyRequest>({
    mutationFn: (req: {
      mapX: number;
      mapY: number;
      content: string;
      img: ImageOrVideo | undefined;
      commPostId: number;
    }) => {
      return modifyCommPost(req);
    },
    onSuccess: () => {
      navigation.reset({
        index: 0,
        routes: [{name: commNavigations.COMM_DETAIL, params: {id: postId}}],
      });
    },
    onError: err => {
      ToastAndroid.show(
        `${err.message} 때문에 수정에 실패함`,
        ToastAndroid.SHORT,
      );
    },
  });

  return mutation;
};

const useWriteCommentMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommentWriteRequest>({
    mutationFn: (req: {commPostId: number; content: string}): Promise<void> => {
      return wrtieComment(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });
    },
    onError: err => {
      ToastAndroid.show(`${err.message} 때문에 실패함`, ToastAndroid.SHORT);
    },
  });

  return mutation;
};

const useModifyCommentMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommentModifyRequest>({
    mutationFn: (req: {commentId: number; content: string}): Promise<void> => {
      return modifyComment(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });
    },
    onError: err => {
      ToastAndroid.show(`${err.message} 때문에 실패함`, ToastAndroid.SHORT);
    },
  });

  return mutation;
};

const useDeleteCommentMutation = (postId: number) => {
  const mutation = useMutation<void, Error, CommentDeleteRequest>({
    mutationFn: (req: {commentId: number}): Promise<void> => {
      return deleteComment(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_COMM_POST_COMMENT, postId],
      });
    },
    onError: err => {
      ToastAndroid.show(`${err.message} 때문에 실패함`, ToastAndroid.SHORT);
    },
  });

  return mutation;
};

export {
  useAddCommentLikeMutation,
  useAddCommPostLikeMutation,
  useAddCommPostSaveMutation,
  useCommPostDetailQuery,
  useDeleteCommentLikeMutation,
  useDeleteCommentMutation,
  useDeleteCommPostLikeMutation,
  useDeleteCommPostMutation,
  useDeleteCommPostSaveMutation,
  useGetCommPostCommentInfiniteQuery,
  useModifyCommentMutation,
  useModifyCommPostMutation,
  useSearchCommPostInfiniteQuery,
  useWriteCommentMutation,
  useWriteCommPostMutation,
};

import {CommentDto, CommPostDetailDto, CommPostDto, KloverPage} from '@/types';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {DELETE, GET, POST, PUT} from './commonApi';
import EncryptedStorage from 'react-native-encrypted-storage';

const MAX_FILE_SIZE = 10;
const MB = 1024 * 1024;
const MAX_IMAGE_VOLUME = 1080;

export const uploadCommPostImage = async (
  setImages: (image: ImageOrVideo | undefined) => void,
) => {
  try {
    const img = await ImagePicker.openPicker({
      width: MAX_IMAGE_VOLUME,
      height: MAX_IMAGE_VOLUME,
      cropping: true,
    });

    if (img.size / MB > MAX_FILE_SIZE) {
      return;
    }

    setImages(img);
  } catch (error) {
    console.log('Image selection error: ', error);
  }
};

export const searchCommPost = async (
  page: number,
  size: number,
  keyword: string,
  sort: string | undefined,
  language: string,
  content: boolean,
  nickname: boolean,
  mapX: number,
  mapY: number,
): Promise<KloverPage<CommPostDto>> => {
  let response;
  if (sort === undefined || sort.length === 0) {
    response = await GET<CommPostDto>('/api/v1/comm-post/search', {
      params: {
        page: page,
        size: size,
        keyword: keyword,
        language: language,
        content: content,
        nickname: nickname,
        mapX: mapX,
        mapY: mapY,
      },
    });
  } else {
    response = await GET<CommPostDto>('/api/v1/comm-post/search', {
      params: {
        page: page,
        size: size,
        keyword: keyword,
        sort: sort,
        language: language,
        content: content,
        nickname: nickname,
        mapX: mapX,
        mapY: mapY,
      },
    });
  }

  if (response.data.kloverPage) {
    return response.data.kloverPage;
  } else {
    throw new Error(`${response.data.returnMessage} 때문에 실패`);
  }
};

export const writeCommPost = async (req: {
  img: ImageOrVideo | undefined;
  mapX: number;
  mapY: number;
  content: string;
}): Promise<CommPostDto> => {
  const formData = new FormData();

  // 필요한 것
  formData.append(
    'commPostForm',
    JSON.stringify({
      mapX: req.mapX,
      mapY: req.mapY,
      content: req.content,
    }),
  );

  // 이미지 파일 추가
  if (!req.img) {
    throw new Error('이미지는 반드시 있어야합니다');
  }

  formData.append('imageFile', {
    uri: req.img.path,
    name: req.img.filename,
    type: req.img.mime,
  });

  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await POST<CommPostDto>('/api/v1/comm-post', formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }

  const body = response.data;

  if (body.data) {
    return body.data;
  } else {
    throw new Error(response.data.returnMessage);
  }
};

export const modifyCommPost = async (req: {
  commPostId: number;
  mapX: number;
  mapY: number;
  img: ImageOrVideo | undefined;
  content: string;
}): Promise<void> => {
  const formData = new FormData();

  // 필요한 것
  formData.append(
    'commPostForm',
    JSON.stringify({
      mapX: req.mapX,
      mapY: req.mapY,
      content: req.content,
    }),
  );

  // 이미지 파일 추가
  if (req.img) {
    formData.append('imageFile', {
      uri: req.img.path,
      name: req.img.filename,
      type: req.img.mime,
    });
  }

  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await PUT<void>(
    `/api/v1/comm-post/${req.commPostId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }
};

export const deleteCommPost = async (req: {
  commPostId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE<void>(
    `/api/v1/comm-post/${req.commPostId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }
};

export const getCommPostDetail = async (
  id: number,
): Promise<CommPostDetailDto> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');
  const response = await GET<CommPostDetailDto>(
    `/api/v1/comm-post/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const body = response.data;

  if (body.returnCode !== '0000') {
    throw new Error(body.returnMessage);
  }

  const data = body.data;

  if (!data) {
    throw new Error(body.returnMessage);
  }

  return data;
};

export const getCommPostComment = async (
  page: number,
  size: number,
  postId: number,
) => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await GET<CommentDto>(
    `/api/v1/comm-post/comment/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page: page,
        size: size,
      },
    },
  );

  if (response.data.kloverPage) {
    return response.data.kloverPage;
  } else {
    throw new Error(response.data.returnMessage);
  }
};

export const wrtieComment = async (req: {
  commPostId: number;
  content: string;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await POST<void>(
    `/api/v1/comm-post/comment/${req.commPostId}`,
    {
      content: req.content,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }
};

export const modifyComment = async (req: {
  commentId: number;
  content: string;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await PUT<void>(
    `/api/v1/comm-post/comment/${req.commentId}`,
    {content: req.content},
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }
};

export const deleteComment = async (req: {
  commentId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE<void>(
    `/api/v1/comm-post/comment/${req.commentId}`,
    {},
    {
      headers: {Authorization: `Bearer ${accessToken}`},
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnMessage);
  }
};

export const addCommentLike = async (req: {
  commentId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await POST<void>(
    `/api/v1/comm-post/comment/like/${req.commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

export const deleteCommentLike = async (req: {
  commentId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE<void>(
    `/api/v1/comm-post/comment/like/${req.commentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

export const addCommPostLike = async (req: {
  commPostId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await POST<void>(
    `/api/v1/comm-post/like/${req.commPostId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

export const deleteCommPostLike = async (req: {
  commPostId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE<void>(
    `/api/v1/comm-post/like/${req.commPostId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

export const addCommPostSave = async (req: {
  commPostId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await POST<void>(
    `/api/v1/comm-post/collection/${req.commPostId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

export const deleteCommPostSave = async (req: {
  commPostId: number;
}): Promise<void> => {
  const accessToken = await EncryptedStorage.getItem('accessToken');

  const response = await DELETE<void>(
    `/api/v1/comm-post/collection/${req.commPostId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.data.returnCode !== '0000') {
    throw new Error(response.data.returnCode);
  }
};

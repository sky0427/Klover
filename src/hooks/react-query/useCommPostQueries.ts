import {queryKeys} from '@/constants/keys';
import useLocationStore from '@/store/useLocationStore';
import {CombinedPostResponse} from '@/types';
import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import useUserLocation from '../useUserLocation';
import {XYForm} from '@/types/type';
import {getSurroundingPosts} from '@/api/commPostApi';

const useSurroundingPostsQuery = (xyForm: XYForm) => {};

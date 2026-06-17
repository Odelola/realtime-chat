import { useQuery } from '@tanstack/react-query';
import {
  type GetArticleResponse,
  type GetArticlesProps,
} from '@/features/articles/types/article';
import { getArticles } from '@/features/articles/services/article-service';
import { QueryHandler } from '@/lib/react-query';

export const useGetArticlesQuery: QueryHandler<
  GetArticleResponse,
  GetArticlesProps
> = (params, options) => {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
    ...options,
  });
};

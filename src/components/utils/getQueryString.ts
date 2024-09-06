import { RESPONSE_FIELDS } from "../../constants";

type QueryParams = {
  limit: number;
  skip: number;
  category: string | null;
};

export function getQueryString(query: QueryParams) {
  return query.category ? 
  `/category/${query.category}?limit=${query.limit}&skip=${query.skip}&select=${RESPONSE_FIELDS.join(',')}` 
  : `?limit=${query.limit}&skip=${query.skip}&select=${RESPONSE_FIELDS.join(',')}`;
}

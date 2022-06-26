import axios from "axios";

//queryKey로 들어오는 것은 배열이다. 배열 확인 후 활용하면 된다.
export const fetchCategoryList = ({ queryKey }: any) => {
  console.log(queryKey);
  return axios.get(queryKey[0]).then(({ data }) => data);
};

export const fetchData = ({ queryKey }: any) => {
  return axios.get(queryKey[0] + queryKey[1]).then(({ data }) => data);
};

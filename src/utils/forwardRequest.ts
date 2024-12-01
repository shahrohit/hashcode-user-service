import axios from "axios";

const forwardRequest = async (
  url: string,
  method: string,
  data: any
): Promise<[any, number]> => {
  try {
    const response = await axios({
      url,
      method,
      data,
    });
    return [response.data, response.status ?? 500];
  } catch (error) {
    throw error;
  }
};
export default forwardRequest;

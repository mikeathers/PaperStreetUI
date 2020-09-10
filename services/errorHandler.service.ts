import { errorMessages } from "../shared/constants";
import { Dispatch } from "redux";

class ErrorHandlerService {
  handleHttpError = async (error: any, _dispatch: Dispatch, action: any) => {
    if (
      error.message === errorMessages.INCOMING_NETWORK_ERROR &&
      !error.response
    ) {
      _dispatch(action([errorMessages.NETWORK_ERROR_MESSAGE]));
    }
    const {
      status,
      data: { errors: errors },
    } = error;

    if (status === 400) {
      _dispatch(action(errors));
    }

    if (status === 404) {
      _dispatch(action([errorMessages.NOT_FOUND_ERROR_MESSAGE]));
    }

    if (status === 500) {
      _dispatch(action(errors));
    }

    throw error.response;
  };
}

export default new ErrorHandlerService();

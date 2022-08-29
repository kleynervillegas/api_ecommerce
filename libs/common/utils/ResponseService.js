export class ResponseService {
    status;
    data;
    message;
    count;
    skip;
    limit;
  
    constructor(
      _status,
      _data,
      _message,
      _count = null,
      _skip = null,
      _limit = null
    ) {
      this.status = _status;
      this.data = _data;
      this.message = _message;
  
      if (_count !== null) {
        this.count = _count;
        this.skip = Number(_skip);
        this.limit = Number(_limit);
      }
    }
  }
  
  export const ResponseErrors = async (params,data) => {
    return data?.errors?.map(error => `El campo ${params[error.param]}, ${error.msg}`)
  }
    
  
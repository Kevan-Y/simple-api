export const createSuccessResponse = (data?: { [key: string]: any }) => {
  return {
    status: 'ok',
    ...data,
  };
};

export const createErrorResponse = (code: any, message: any) => {
  return {
    status: 'error',
    error: {
      code,
      message,
    },
  };
};

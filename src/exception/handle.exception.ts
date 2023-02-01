import { HttpStatus } from '@nestjs/common';

export const handleException = (error: any, entity: any, response: any) => {
  if (error.code == 11000) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: 400,
      message: `Error: This ${entity} exists in db currently!`,
      error,
    });
  }
  return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: `Error: ${entity} not created!`,
    error,
  });
};

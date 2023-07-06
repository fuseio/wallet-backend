import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx?.switchToHttp()?.getRequest();
    return request?.user?._id as string;
  },
);

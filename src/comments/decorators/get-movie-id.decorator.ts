import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetMovieId = createParamDecorator(
  (_data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const { movieId } = req.params;
    return Number(movieId);
  },
);

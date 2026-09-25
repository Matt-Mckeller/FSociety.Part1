import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerException } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    
    // GraphQL context may not have res, create a mock response for throttling
    const req = ctx.req;
    const res = ctx.res || {
      header: () => {}, // Noop if no response object
      setHeader: () => {},
    };
    
    return { req, res };
  }

  protected getTracker(req: Record<string, any>): Promise<string> {
    // Use X-Forwarded-For if behind proxy, otherwise use IP
    const forwarded = req.headers?.['x-forwarded-for'];
    const ip = forwarded
      ? (forwarded as string).split(',')[0].trim()
      : req.ip || req.connection?.remoteAddress || 'unknown';
    return Promise.resolve(ip);
  }
}

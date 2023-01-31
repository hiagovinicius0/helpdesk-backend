import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const Public = (): CustomDecorator<string> =>
  SetMetadata(IS_PUBLIC, true);

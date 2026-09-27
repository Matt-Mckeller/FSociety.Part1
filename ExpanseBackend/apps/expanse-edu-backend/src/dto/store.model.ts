import { Field, ObjectType } from '@nestjs/graphql';
import { Class } from '../entities';
import { Class as EdLinkClass } from '@edlink/typescript';
import { StoreRewardDto } from './StoreReward.model';

@ObjectType()
export class ClassroomStoreDto {
  @Field({ nullable: true })
  id?: string;

  @Field()
  elId: string;

  @Field()
  name: string;

  @Field(() => [StoreRewardDto])
  storeRewards: StoreRewardDto[];

  static fromClass(
    edLinkClass: EdLinkClass,
    expanseClass?: Class,
  ): ClassroomStoreDto {
    const classroomStoreDto = new ClassroomStoreDto();
    classroomStoreDto.id = expanseClass?.id ?? null;
    classroomStoreDto.elId = expanseClass?.edLinkID ?? edLinkClass.id;
    classroomStoreDto.name = edLinkClass.name;
    classroomStoreDto.storeRewards =
      expanseClass && expanseClass.storeRewards.length > 0
        ? expanseClass.storeRewards.map((reward) =>
            StoreRewardDto.fromReward(reward),
          )
        : [];

    return classroomStoreDto;
  }
}

import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class PaginatePostDto {
  // 이전 마지막 데이터의 ID
  // 이 프로퍼티에 입력된 ID 보다 높은 ID부터 값을 가져오기
  @IsNumber()
  @IsOptional()
  where__id_more_than?: number;

  @IsNumber()
  @IsOptional()
  where__id_less_than?: number;

  // 정렬
  // createAt -> 생성된 시간 내림차/"오름차" 순으로 정렬
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  order__createAt?: 'ASC' | 'DESC' = 'ASC';

  // 몇 개의 데이터를 응답으로 받을 지
  @IsNumber()
  @IsOptional()
  take: number = 20;
}

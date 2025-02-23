import { PartialType } from '@nestjs/swagger';
import { CreateFavoriteTestDto } from './create-favorite-test.dto';

export class UpdateFavoriteTestDto extends PartialType(CreateFavoriteTestDto) {}

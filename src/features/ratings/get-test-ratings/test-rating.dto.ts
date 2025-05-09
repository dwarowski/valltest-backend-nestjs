export class TestRatingDto {
  id: number;
  rating: number;
  comment: string | null;
  user: {
    username: string | null;
    avatar_location: string | null;
  };
}

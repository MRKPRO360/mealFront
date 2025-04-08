export interface IReview {
  _id: string;
  userId: {
    _id: string;
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    customer: {
      _id: string;
      user: string;
      profileImg: string;
    };
  };
  targetId: string;
  targetType: 'recipe' | 'provider';
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

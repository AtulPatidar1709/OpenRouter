
import { AuthenticatedRequest } from '../../types/AuthenticatedRequestTypes.js';
import { AppError } from '../../utils/AppError.js';

const getUserId = (req: AuthenticatedRequest): string => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new AppError('User not authenticated', 401);
  }
  return userId;
};

export { getUserId };


import { UserData } from "../types/UserData"; 

declare global {
  namespace Express {
    interface Request {
      user?: UserData; 
    }
  }
}


import { token } from "../Constants/constants"

export const api={
    
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      
}
export const parseExpirationTime = (expiresIn: string): number => {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1), 10);
  
    switch (unit) {
      case 's':
        return value;
      case 'm': 
        return value * 60;
      case 'h': 
        return value * 60 * 60;
      case 'd':
        return value * 60 * 60 * 24;
      default:
        throw new Error(`Invalid expiration time unit: ${unit}`);
    }
  };
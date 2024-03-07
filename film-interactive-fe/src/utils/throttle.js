export const throttle = (callback, delay) => {
    let timeout;

    return (...args) => {
      if (timeout !== undefined) {
        return
      }
  
      timeout = setTimeout(() => {
        timeout = undefined
      }, delay)
  
      return callback(...args)
    }
  }
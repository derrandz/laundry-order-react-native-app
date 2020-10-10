export function retryIn(seconds) {
  const schedule = (promise) => {
    let p = promise()

    const intervalId = setInterval(() => {
      p.then(
        (presponse) => {
          clearInterval(intervalId)
          return presponse
        }
      )   
    }, seconds * 1000)

    return p
  }
  
  return (promise) => {
    return schedule(promise)
  }
}

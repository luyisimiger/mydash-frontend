
export function getHeader(msg, headerName) {
  return msg.payload.headers.reduce((val, header) => {
    if (header.name === headerName) {
      val = header.value
    }
    return val
  })
}

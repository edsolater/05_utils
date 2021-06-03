export * from './core'

const senderTransform = new TransformStream({
  start() {
    // Called on startup.
  },

  async transform(encodedFrame, controller) {
    const view = new DataView(encodedFrame.data)
    // Create a new buffer with 4 additional bytes.
    const newData = new ArrayBuffer(encodedFrame.data.byteLength + 4)
    const newView = new DataView(newData)

    // Fill the new buffer with a negated version of all
    // the bits in the original frame.
    for (let i = 0; i < encodedFrame.data.byteLength; ++i) newView.setInt8(i, ~view.getInt8(i))
    // Set the padding bytes to zero.
    for (let i = 0; i < 4; ++i) newView.setInt8(encodedFrame.data.byteLength + i, 0)

    // Replace the frame's data with the new buffer.
    encodedFrame.data = newData

    // Send it to the output stream.
    controller.enqueue(encodedFrame)
  },

  flush() {
    // Called when the stream is about to be closed.
  }
})

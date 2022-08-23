// normalize data
// use one hot encoding for expected results if classification
export class TensorFLow {
  // https://learn.ml5js.org/#/reference/neural-network
  // https://scikitjs.org/docs/api
  // https://medium.com/@jayantspeaks/training-models-with-tensorflow-js-using-csv-data-9482f9962d17
  // // import * as tf from '@tensorflow/tfjs';
  // public static async failedAttempt(): Promise<void> {
  //   // Create a simple model.
  //   const model = tf.sequential();
  //   model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  //   // Prepare the model for training: Specify the loss and the optimizer.
  //   model.compile({ loss: 'categoricalCrossentropy', optimizer: 'sgd' });
  //   // Generate some synthetic data for training. (y = 2x - 1)
  //   const xs = tf.tensor2d([0.1, 0.2, 0.3, 0.4, 0.6, 0.2], [6, 1]);
  //   const ys = tf.tensor2d([0.2, 0.4, 0.1, 0.4, 0.5, 0.1], [6, 1]);
  //   // Train the model using the data.
  //   await model.fit(xs, ys, { epochs: 250 });
  //   // use tf.tidy(() => { to clear memory
  //   // Use the model to do inference on a data point the model hasn't seen.
  //   // Should print approximately 39.
  //   const result = (model.predict(tf.tensor2d([0.6], [1, 1])) as tf.Tensor).dataSync();
  //   console.log(result);
  // }
}

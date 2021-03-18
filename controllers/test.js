// const imageResizeCompress = require('image-resize-compress');

// const handleBlob = (blobFile) => {
//   // quality value for webp and jpeg formats.
//   const quality = 80;
//   // output width. 0 will keep its original width and 'auto' will calculate its scale from height.
//   const width = 0;
//   // output height. 0 will keep its original height and 'auto' will calculate its scale from width.
//   const height = 0;
//   // file format: png, jpeg, bmp, gif, webp. If null, original format will be used.
//   const format = 'png';
 
//   // note only the blobFile argument is required
//   imageResizeCompress.fromBlob(blobFile, quality, width, height, format).then((blob) => {
//     // will output the converted blob file
//     console.log(blob);
//     // will generate a url to the converted file
//     imageResizeCompress.blobToURL(blob).then((url) => console.log(url));
//   });
// };


exports.test = (req, res, next) => {
    console.log(req.file);
    // const testObject = JSON.parse(req.body.test)
    // console.log(req.headers);
    res.status(201).json({message: 'test ok !'})
}
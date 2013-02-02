# Express-Upload
Express-Upload exposes a chainable/fluent API to process uploaded files in express. In case you're searching for
a solution focused on processing image uploads, take a look at [express-upload-resizer](https://github.com/thomaspeklak/express-upload-resizer).

## Installation

    $ npm install passport
    
## Usage

    var upload = require('express-upload');
    
    // ..
    
    upload()
        .accept('image/jpeg')
        .gm(function(gm) {
            return gm.resize(false, 100);
        })
        .to(['public', 'images'])
        .exec(req.files.displayImage, function(err, file) {
            // further process file
        });

## Processing Chains

After creating an `Upload` object by calling `upload()` the upload object exposes API methods

### accept
Restricts files accepted by upload to specified mime types. Mime types can be specified as strings, array of strings, 
regex or array of regex. In case match fails an `err` object is passed to the `exec` callback field `accept` set to true.

#### Examples

Accept mp4, ogg and jpeg files in upload

      accept(['audio/mp4', 'audio/ogg', 'image/jpeg'])

Accept only mp4

      accept('audio/mp4')

Accept all audio mime types p

      accept([/audio.*/])

### to
Moves files from temp express upload location to the target location. The `to` processor modifies `file.path` and `file.name`
fields of the original express upload file to point to the moved upload file. `to` will use any given file extension from 
the original `file.name`. A target directory is expected as argument, in case an array of strings is passed this array will be
joined via `path.join`.

#### Examples

Moves uploaded files to public/images

      to(['public', 'images'])
      
Moves uploaded files to public/images

      to('public/images')
      
### gm
Allows uploaded files to be processed via GraphicsMagick or ImageMagick. See [gm page](http://aheckmann.github.com/gm/) for
using gm.

#### Examples

Resize an uploaded image to height of 100 with aspect ration

      gm(function(gm) {
          return gm.resize(false, 100);
      })

### process
Generic handler to pass custom transformation code in the processing chain. Functions passed to `process` must have the 
signature

      fn(file, cb)
      
Where file is the processed upload file and `cb` is the callback.

### exec
Executes a processing chain. Processing chains are reusable and may be executed multiple times. In case the file is not
part of the upload or is empty an `err` is passed to the callback with a field `noFile` set to true.


## Middleware
Instead of executing and managing upload file processing in your routes, express-upload can be used as middleware in express.
Any processing errors (no file, file type not accepted,...) are stored in a `err` property of the file to upload.

### Example

      // Build an upload instance but don't execute it right now
      var uploadDefinition = upload()
          .accept('image/jpeg')
          .gm(function(gm) {
              return gm.resize(false, 100);
          })
          .to(['public', 'images']);
      
      // Define a middleware for handling image upload
      app.post('/middleware', uploadDefinition.middleware('displayImage'), routes.uploadUsingMiddleware);

In case an error would occur when uploading `req.files.displayImage`, `req.files.displayImage.err` would be set to an Error
object.

## Show me some example
[Simple upload](examples/uploads).

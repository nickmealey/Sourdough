define(function() {
  // Get image from url
  String.prototype.getImageName = function() {
    var PATTERN = /.+\/(.+(jpg|jpeg|png|gif))/i;
    var match = this.match(PATTERN);
    return match[1];
  }

  // Set image size from a url
  String.prototype.imageSize = function(size) {
    var PATTERN = /(.+)(\.(jpg|jpeg|png|gif))(\?.+)/i;
    var match = this.match(PATTERN);
    return match[1] + "_" + size + match[2] + match[4];
  };
});
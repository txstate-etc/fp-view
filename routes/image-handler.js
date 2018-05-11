module.exports = function (req, path, width, height) {
  var imghurl = process.env.IMAGE_HANDLER_URL
  if (!imghurl) return '';
  if (imghurl.startsWith('//')) imghurl = 'http:'+imghurl;
  return imghurl+'/imagehandler/scaler/'+req.hostname +path+'?mode=fit&width=' + width + '&height=' + height + '&quality=80&3'
}

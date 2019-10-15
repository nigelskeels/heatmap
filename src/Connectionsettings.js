const firstSourceUrl = 'https://portal.bizie.com:51002/'

function imagelocation(){
  const imaloc = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/images/"
  return imaloc
}

export {firstSourceUrl,imagelocation}

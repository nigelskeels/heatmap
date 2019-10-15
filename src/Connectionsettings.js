const firstSourceUrl = 'http://localhost:3001/'


function imagelocation(){
  const imaloc = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/images/"
  return imaloc
}

export {firstSourceUrl,imagelocation}

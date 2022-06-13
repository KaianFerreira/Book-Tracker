const uploadImage = (file, image, imageFile, maxWidth, maxHeight) => {
  const reader = new FileReader()
  reader.onload = e => {
    const img = new Image()
    img.onload = function () {
      let width = this.width
      let height = this.height
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(img, 0, 0, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 1)
      image(dataUrl)
      const binStr = atob(dataUrl.split(',')[1])
      const arr = new Uint8Array(binStr.length).map((x, i) => binStr.charCodeAt(i))
      imageFile(new Blob([arr], { type: 'image/jpeg' }))
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}

export {
  uploadImage
}

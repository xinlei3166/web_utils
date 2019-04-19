previewImage(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
        return this.result
    }
}
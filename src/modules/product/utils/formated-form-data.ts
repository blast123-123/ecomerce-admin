export const formatedFormData = (data: string, files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('images', file)
  })
  formData.append('data', data)
  return formData
}

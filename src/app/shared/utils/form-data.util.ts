export function buildFormData(
  formValue: Record<string, any>
): FormData {

  const formData = new FormData();

  Object.entries(formValue).forEach(([key, value]) => {

    if (value === null || value === undefined) {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}
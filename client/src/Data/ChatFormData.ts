export interface ChatFormData {
  message: string;
}

export function prepareModel(form: ChatFormData) : ChatFormData {
  return ({
    message: form.message,
  });
}

export function prepareForm(model: ChatFormData | null = null) : ChatFormData {
  return ({
    message: model?.message ?? '',
  });
}

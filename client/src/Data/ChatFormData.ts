export interface ChatFormData {
  text: string;
}

export function prepareModel(form: ChatFormData) : ChatFormData {
  return ({
    text: form.text,
  });
}

export function prepareForm(model: ChatFormData | null = null) : ChatFormData {
  return ({
    text: model?.text ?? '',
  });
}

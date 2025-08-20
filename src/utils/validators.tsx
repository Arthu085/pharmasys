export const validatePasswordMatch = ({ getFieldValue }: any) => ({
  validator(_: any, value: string) {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('As senhas não coincidem!'));
  },
});
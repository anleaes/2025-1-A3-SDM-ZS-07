const fakeUser = {
  email: 'usuario@email.com',
  password: '123456',
  token: 'fake-jwt-token',
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === fakeUser.email && password === fakeUser.password) {
        resolve({ token: fakeUser.token });
      } else {
        reject('Credenciais inválidas');
      }
    }, 1000); // Simula atraso de rede
  });
};

export const register = async (email, password) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ token: 'new-fake-jwt-token' });
    }, 1000);
  });
};

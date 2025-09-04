const {calcularMediaAluno} = require('../src/calcularMediaAluno');

describe('calcularMediaAluno', () => {
    it('deve ser uma função definida', () => {
      expect(calcularMediaAluno).toBeDefined();
    });
  });

// Novo teste para valores indefinidos
it('deve lançar um erro se a1 ou a2 forem indefinidos', () => {
    expect(() => calcularMediaAluno(undefined, 8)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(7, undefined)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(undefined, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

  // Novo teste para valores negativos
  it('deve lançar um erro se a1 ou a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-5, 8)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(7, -2)).toThrow('Notas a1 ou a2 não podem ser negativas');
    expect(() => calcularMediaAluno(-1, -1)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

  it('deve calcular a média ponderada de a1 e a2 quando a3 não for informada', () => {
    // Exemplo: (7.5 * 0.4) + (8.5 * 0.6) = 3.0 + 5.1 = 8.1
    expect(calcularMediaAluno(7.5, 8.5)).toBeCloseTo(8.1);
    // Exemplo: (10 * 0.4) + (6 * 0.6) = 4 + 3.6 = 7.6
    expect(calcularMediaAluno(10, 6)).toBeCloseTo(7.6);
  });

  // Novo teste para a3 negativa
  it('deve lançar um erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(7, 8, -1)).toThrow('Nota a3 não pode ser negativa');
  });

  // Novo teste para a melhor combinação com a3 e a1
  it('deve calcular a média com a3 e a1 se essa for a melhor combinação', () => {
    // a1 = 10, a2 = 5, a3 = 9
    // Média a1 e a2 = (10 * 0.4) + (5 * 0.6) = 4 + 3 = 7
    // Média a1 e a3 = (10 * 0.4) + (9 * 0.6) = 4 + 5.4 = 9.4
    // Média a3 e a2 = (9 * 0.4) + (5 * 0.6) = 3.6 + 3 = 6.6
    expect(calcularMediaAluno(10, 5, 9)).toBeCloseTo(9.4);
  });

  // Novo teste para a melhor combinação com a3 e a2
  it('deve calcular a média com a3 e a2 se essa for a melhor combinação', () => {
    // a1 = 5, a2 = 10, a3 = 9
    // Média a1 e a2 = (5 * 0.4) + (10 * 0.6) = 2 + 6 = 8
    // Média a1 e a3 = (5 * 0.4) + (9 * 0.6) = 2 + 5.4 = 7.4
    // Média a3 e a2 = (9 * 0.4) + (10 * 0.6) = 3.6 + 6 = 9.6
    expect(calcularMediaAluno(5, 10, 9)).toBeCloseTo(9.6);
  });